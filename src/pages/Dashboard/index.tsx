import { useState } from 'react'
import { TypewriterEffect } from '@components/TypeWriterEffect'
import {
    Button,
    Select,
    Option,
    Typography,
    Progress,
} from '@material-tailwind/react'

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

    return (
        <div className="flex flex-col w-full h-screen pt-[10rem] gap-20">
            <div className="flex flex-col items-center justify-center gap-10">
                <Typography
                    variant="lead"
                    className="text-neutral-600 dark:text-neutral-200 text-base"
                >
                    The road to scraping starts from here
                </Typography>
                <TypewriterEffect words={words} />
            </div>
            <div className="flex flex-col max-w-5xl mx-auto gap-12">
                <div className="flex items-center gap-10">
                    <div className="flex w-72">
                        <Select
                            variant="outlined"
                            label="Select Site"
                            disabled={isScraping}
                        >
                            <Option>Quadratec</Option>
                            <Option disabled>coming soon...</Option>
                        </Select>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            color="blue"
                            loading={isScraping}
                            onClick={() => setIsScraping(true)}
                        >
                            Start
                        </Button>
                        <Button
                            color="red"
                            disabled={!isScraping}
                            onClick={() => setIsScraping(false)}
                        >
                            Stop
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-8 w-full">
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" variant="h6">
                                Brand
                            </Typography>
                        </div>
                        <Progress
                            color="blue"
                            value={33}
                            variant="gradient"
                            label="Completed"
                        />
                    </div>
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" variant="h6">
                                Metadata
                            </Typography>
                            <Typography color="blue-gray" variant="h6">
                                78/100
                            </Typography>
                        </div>
                        <Progress
                            color="blue"
                            value={78}
                            variant="gradient"
                            label="Completed"
                        />
                    </div>
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" variant="h6">
                                Detail
                            </Typography>
                            <Typography color="blue-gray" variant="h6">
                                125/253
                            </Typography>
                        </div>
                        <Progress
                            color="blue"
                            value={49}
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
