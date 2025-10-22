
import React, { useEffect, useState } from 'react'

const CountDownItem = ({ banner }) => {

    const [time, setTime] = useState(0)

    const getFormatedTime = (banner) => {

        const timeString = banner?.time;
        const [hr, min] = timeString ? timeString?.split(':')?.map(Number) : [0, 0]
        const extraTime = (hr * 3600000) + (min * 60000);

        const milliseconds = new Date(banner?.startdate).getTime() - new Date()?.getTime() + extraTime || 0
        if (milliseconds <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)) || 0;
        const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || 0;
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)) || 0;
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000) || 0;

        return { days, hours, minutes, seconds }
    }

    useEffect(() => {

        const timeString = banner?.time;
        const [hr, min] = timeString ? timeString?.split(':')?.map(Number) : [0, 0]
        const extraTime = (hr * 3600000) + (min * 60000);

        const milliseconds = new Date(banner?.startdate).getTime() - new Date()?.getTime() + extraTime || 0
        setTime(milliseconds)
        if (milliseconds <= 0) {
            return
        }
        const interval = setInterval(() => {
            setTime(time => time - 1000);
        }, 1000);
        return () => clearInterval(interval);

    }, [])

    return (
        <div
            className="hero relative overflow-hidden"
        >
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: banner?.image
                        ? `url(${banner?.image})`
                        :
                        "url(https://i.ibb.co.com/vvXVccv7/time-Banner.png)",
                    filter: "blur(8px)",
                    transform: "scale(1.1)",
                }}
            >

            </div>
            <div className="hero-overlay bg-opacity-60 absolute inset-0"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-4xl font-bold">Next Event Countdown</h1>
                    <div className='flex justify-center items-center mb-3'>
                        <div className="grid grid-flow-col gap-5 text-center  auto-cols-max text-[#f7a320] font-extrabold">
                            <div className="flex flex-col">
                                <span className="countdown font-mono text-5xl ">
                                    <span
                                        style={{ "--value": getFormatedTime(banner).days }}
                                        aria-live="polite"
                                        aria-label="15 days remaining"
                                    >
                                    </span>
                                </span>
                                {getFormatedTime(banner).days > 0 ? 'days' : 'day'}
                            </div>
                            <div className="flex flex-col">
                                <span className="countdown font-mono text-5xl">
                                    <span
                                        style={{ "--value": getFormatedTime(banner).hours }}
                                        aria-live="polite"
                                        aria-label="10 hours remaining"
                                    >
                                        {getFormatedTime(banner).hours - 6}
                                    </span>
                                </span>
                                {getFormatedTime(banner).hours > 0 ? "hours" : "hour"}
                            </div>
                            <div className="flex flex-col">
                                <span className="countdown font-mono text-5xl">
                                    <span
                                        style={{ "--value": getFormatedTime(banner).minutes }}
                                        aria-live="polite"
                                        aria-label="24 minutes remaining"
                                    >
                                        {getFormatedTime(banner).minutes}
                                    </span>
                                </span>
                                min
                            </div>
                            <div className="flex flex-col">
                                <span className="countdown font-mono text-5xl">
                                    <span
                                        style={{ "--value": getFormatedTime(banner).seconds }}
                                        aria-live="polite"
                                        aria-label="59 seconds remaining"
                                    >
                                        {getFormatedTime(banner).seconds}
                                    </span>
                                </span>
                                sec
                            </div>
                        </div>
                    </div>
                    <h1 className="mb-2 text-3xl font-bold">{banner?.name}</h1>
                </div>
            </div>
        </div>
    )
}

export default CountDownItem