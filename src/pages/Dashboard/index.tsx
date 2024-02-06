import { useEffect, useState } from 'react'
import { TypewriterEffect } from '@components/TypeWriterEffect'
import {
    Button,
    Select,
    Option,
    Typography,
    Progress,
} from '@material-tailwind/react'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import { API_SERVER_URL } from '@/constants'

interface IProgress {
    brands: number
    categories?: number
    metadata: number
    details: number
}

interface ISite {
    label: string
    value: string
}

const Home = () => {
    const words = [
        {
            text: 'Scrape',
        },
        {
            text: 'websites',
        },
        {
            text: 'easily',
        },
        {
            text: 'with',
        },
        {
            text: 'AutoScraping.',
            className: 'text-blue-500 dark:text-blue-500',
        },
    ]

    const [isDownloading, setIsDownloading] = useState(false)
    const [isScraping, setIsScraping] = useState(false)
    const initialProgress: IProgress = {
        brands: 0,
        categories: 0,
        metadata: 0,
        details: 0,
    }
    const [progress, setProgress] = useState<IProgress>(initialProgress)
    const sites: ISite[] = [
        { label: 'Polyperformance', value: 'polyperformance' },
        { label: 'Quadratec', value: 'quadratec' },
    ]
    const [site, setSite] = useState<string | undefined>()
    const [scraping, setScraping] = useState<string | undefined>()

    const handleStart = () => {
        fetch(`${API_SERVER_URL}/api/v1/${site}/start`)
            .then((res) => res.json())
            .then((data) => {
                setIsScraping(true)
                setScraping(site)
                toast.success(data?.result)
            })
            .catch((err) => {
                console.error('start: ', err)
                toast.error('Error occurred!!')
            })
    }
    const handlePause = () => {
        fetch(`${API_SERVER_URL}/api/v1/utils/pause`)
            .then((res) => res.json())
            .then((data) => {
                setIsScraping(false)
                setScraping(undefined)
                toast.info(data?.result)
            })
            .catch((err) => {
                console.error('pause: ', err)
                toast.error('Error occurred!!')
            })
    }
    const handleStop = () => {
        fetch(`${API_SERVER_URL}/api/v1/${site}/stop`)
            .then((res) => res.json())
            .then((data) => {
                setIsScraping(false)
                setScraping(undefined)
                toast.info(data?.result)
            })
            .catch((err) => {
                console.error('stop: ', err)
                toast.error('Error occurred!!')
            })
    }
    const handleDownload = () => {
        setIsDownloading(true)
        fetch(`${API_SERVER_URL}/api/v1/${site}/download`)
            .then((res) => res.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `${site}_output.zip`)
                document.body.appendChild(link)
                link.click()
            })
            .catch(() => toast.error("Can't download file!"))
            .finally(() => setIsDownloading(false))
    }

    useEffect(() => {
        fetch(`${API_SERVER_URL}/api/v1/utils/status`)
            .then((res) => res.json())
            .then((data) => {
                setIsScraping(data?.result)
                setScraping(data?.site)
            })
            .catch(() => setIsScraping(false))

        const interval = setInterval(() => {
            fetch(`${API_SERVER_URL}/api/v1/utils/status`)
                .then((res) => res.json())
                .then((data) => setIsScraping(data?.result))
                .catch(() => setIsScraping(false))
        }, 3000)

        // eslint-disable-next-line consistent-return
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!site) return
        fetch(`${API_SERVER_URL}/api/v1/${site}/progress`)
            .then((res) => res.json())
            .then((data) => setProgress(data.result))
            .catch(() => setProgress(initialProgress))

        const interval = setInterval(() => {
            fetch(`${API_SERVER_URL}/api/v1/${site}/progress`)
                .then((res) => res.json())
                .then((data) => setProgress(data.result))
                .catch(() => setProgress(initialProgress))
        }, 3000)

        // eslint-disable-next-line consistent-return
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [site])

    return (
        <div className="flex flex-col w-full h-screen pt-[10rem] gap-20">
            <div className="flex flex-col items-center justify-center gap-10">
                <Typography
                    variant="lead"
                    className="text-base text-neutral-600 dark:text-neutral-200"
                >
                    The road to scraping starts from here
                </Typography>
                <TypewriterEffect words={words} />
            </div>
            <div className="flex flex-col max-w-5xl gap-12 mx-auto">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-10">
                        <div className="flex w-72">
                            <Select
                                variant="outlined"
                                label="Select Site"
                                onChange={(value) => {
                                    setSite(value)
                                }}
                                value={site}
                            >
                                {sites.map((el, id) => (
                                    <Option key={`site-${id}`} value={el.value}>
                                        {el.label}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                color="blue"
                                loading={isScraping}
                                onClick={handleStart}
                                disabled={!site || isScraping}
                            >
                                Start
                            </Button>
                            <Button
                                color="green"
                                disabled={!isScraping}
                                onClick={handlePause}
                            >
                                Pause
                            </Button>
                            <Button
                                color="red"
                                disabled={!site}
                                onClick={handleStop}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                    {scraping && (
                        <Typography variant="small" color="blue">
                            <i>Scraping {scraping}</i>
                        </Typography>
                    )}
                </div>
                <div className="flex flex-col w-full gap-8">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Typography color="blue-gray" variant="h6">
                                Brand
                            </Typography>
                            <Typography color="blue-gray" variant="h6">
                                {progress.brands.toFixed(2)}%
                            </Typography>
                        </div>
                        <Progress
                            color="blue"
                            value={progress.brands}
                            variant="gradient"
                        />
                    </div>
                    {site === 'quadratec' && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Typography color="blue-gray" variant="h6">
                                    Categories
                                </Typography>
                                <Typography color="blue-gray" variant="h6">
                                    {progress?.categories?.toFixed(2)}%
                                </Typography>
                            </div>
                            <Progress
                                color="blue"
                                value={progress?.categories}
                                variant="gradient"
                            />
                        </div>
                    )}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Typography color="blue-gray" variant="h6">
                                Metadata
                            </Typography>
                            <Typography color="blue-gray" variant="h6">
                                {progress.metadata.toFixed(2)}%
                            </Typography>
                        </div>
                        <Progress
                            color="blue"
                            value={progress.metadata}
                            variant="gradient"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Typography color="blue-gray" variant="h6">
                                Detail
                            </Typography>
                            <Typography color="blue-gray" variant="h6">
                                {progress.details.toFixed(2)}%
                            </Typography>
                        </div>
                        <Progress
                            color="blue"
                            value={progress.details}
                            variant="gradient"
                        />
                    </div>
                </div>
                <Button
                    disabled={!site || isDownloading}
                    color="blue"
                    className="flex items-center justify-center gap-3"
                    onClick={handleDownload}
                    loading={isDownloading}
                >
                    <ArrowDownTrayIcon width={24} height={24} />
                    Download CSV
                </Button>
            </div>
        </div>
    )
}

export default Home
