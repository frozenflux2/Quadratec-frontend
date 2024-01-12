import { useEffect, useState } from 'react'
import { TypewriterEffect } from '@components/TypeWriterEffect'
import {
    Button,
    Select,
    Option,
    Typography,
    Progress,
} from '@material-tailwind/react'

interface IProgress {
    brands: number
    metadata: number
    detail: number
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

    const [isScraping, setIsScraping] = useState(false)
    const [progress, setProgress] = useState<IProgress>({
        brands: 0,
        metadata: 0,
        detail: 0,
    })
    const [totalCounts, setTotalCounts] = useState<IProgress>({
        brands: 57,
        metadata: 246,
        detail: 361,
    })
    const sites = ['Polyperformance', 'Quadratec']
    const [site, setSite] = useState<string | undefined>()

    const [intervalId, setIntervalId] = useState<number | null>(null)

    const handleStart = () => {
        if (!site) return
        setIsScraping(true)
        setProgress({
            brands: 0,
            metadata: 0,
            detail: 0,
        })
        if (!intervalId) {
            const newIntervalId = setInterval(() => {
                setProgress((prev) => {
                    if (prev.brands < 100)
                        return { ...prev, brands: prev.brands + 20 }
                    if (prev.metadata < 100)
                        return { ...prev, metadata: prev.metadata + 20 }
                    if (prev.detail < 100)
                        return { ...prev, detail: prev.detail + 20 }

                    if (intervalId) clearInterval(intervalId)
                    setIntervalId(null)
                    setIsScraping(false)
                    return prev
                })
            }, 1000)
            setIntervalId(newIntervalId as unknown as number)
        }
    }

    useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [intervalId])

    const handleStop = () => {
        if (intervalId) clearInterval(intervalId)
        setIntervalId(null)
        setIsScraping(false)
        setProgress({
            brands: 0,
            metadata: 0,
            detail: 0,
        })
    }

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
                <div className="flex items-center gap-10">
                    <div className="flex w-72">
                        <Select
                            variant="outlined"
                            label="Select Site"
                            disabled={isScraping}
                            onChange={(value) => {
                                setSite(value)
                            }}
                            value={site}
                        >
                            {sites.map((el, id) => (
                                <Option key={`site-${id}`} value={el}>
                                    {el}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            color="blue"
                            loading={isScraping}
                            onClick={handleStart}
                        >
                            Start
                        </Button>
                        <Button
                            color="red"
                            disabled={!isScraping}
                            onClick={handleStop}
                        >
                            Stop
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-8">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Typography color="blue-gray" variant="h6">
                                Brand
                            </Typography>
                        </div>
                        <Progress
                            color="blue"
                            value={progress.brands}
                            variant="gradient"
                            label="Completed"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Typography color="blue-gray" variant="h6">
                                Metadata
                            </Typography>
                            <Typography color="blue-gray" variant="h6">
                                {(
                                    (totalCounts.metadata * progress.metadata) /
                                    100
                                ).toFixed(0)}
                                /{totalCounts.metadata}
                            </Typography>
                        </div>
                        <Progress
                            color="blue"
                            value={progress.metadata}
                            variant="gradient"
                            label="Completed"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Typography color="blue-gray" variant="h6">
                                Detail
                            </Typography>
                            <Typography color="blue-gray" variant="h6">
                                {(
                                    (totalCounts.detail * progress.detail) /
                                    100
                                ).toFixed(0)}
                                /{totalCounts.detail}
                            </Typography>
                        </div>
                        <Progress
                            color="blue"
                            value={progress.detail}
                            variant="gradient"
                            label="Completed"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
