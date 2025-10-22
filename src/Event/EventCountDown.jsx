import { useEffect, useLayoutEffect, useState,memo } from "react";
import { BASE_URL } from "../../constants";

const Eventcountdown = memo(({banner}) => {

    // console.log('banner', banner)

    const [time,setTime] = useState(0)

    const getFormatedTime = (banner) => {


        const timeString = banner?.time;
        const [hr, min] = timeString ? timeString?.split(':')?.map(Number) : [0,0]
        const extraTime = (hr * 3600000) + (min * 60000);

        console.log('extraTime', extraTime)

        const milliseconds = new Date(banner?.startdate).getTime() - new Date()?.getTime() + extraTime || 0

        if(milliseconds <= 0){
            return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        
        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)) || 0;
        const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || 0;
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)) || 0;
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000) || 0;
        return { days, hours, minutes, seconds }
    }

    useEffect(() => {

        const milliseconds = new Date(banner?.startdate).getTime() - new Date()?.getTime() 
        setTime(milliseconds)
        if(milliseconds <= 0){
            return
        }
        const interval = setInterval(() => {
            setTime(time => time - 1000);
        }, 1000);
        return () => clearInterval(interval);

    }, [])

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {getFormatedTime(time).days >= 0  && <div className="bg-[#2c3240] text-white px-4 py-3 rounded-xl w-40">
                <span className="text-2xl font-bold">{getFormatedTime(banner).days || '00'}</span>
                <p className="text-sm">{getFormatedTime(banner).days > 0 ? 'Day' : 'Days'}</p>
            </div>}
            {<div className="bg-[#2c3240] text-white px-4 py-3 rounded-xl w-40">
                <span className="text-2xl font-bold">{getFormatedTime(banner).hours || '00'}</span>
                <p className="text-sm">{getFormatedTime(banner).hours > 0 ? 'Hour' : 'Hours'}</p>
            </div>}
            {<div className="bg-[#2c3240] text-white px-4 py-3 rounded-xl w-40">
                <span className="text-2xl font-bold">{getFormatedTime(banner).minutes || '00'}</span>
                <p className="text-sm">{getFormatedTime(banner).minutes > 0  ? 'Minute' : 'Minutes'}</p>
            </div>}
            {<div className="bg-[#2c3240] text-white px-4 py-3 rounded-xl w-40">
                <span className="text-2xl font-bold">{getFormatedTime(banner).seconds || '00'}</span>
                <p className="text-sm">{getFormatedTime(banner).seconds > 0 ? 'Second' : 'Seconds'}</p>
            </div>}
        </div>
    );
});

//memoize

export default Eventcountdown;
