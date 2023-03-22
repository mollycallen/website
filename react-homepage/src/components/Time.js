import { useState, useEffect } from 'react'
import '../styles/Time.css'

const Time = () => {
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        let today = new Date();

        const updateTime = () => {
            let now = new Date()
            let t = now.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            })
            setTime(t);
        }

        const startTimeUpdate = () => {
            setInterval(() => {
                updateTime();
            }, 60000);
        }

        setDay(today.toLocaleDateString("en-US",
            {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }));
        updateTime();
        startTimeUpdate();
    }, []);

    return (
        <div className='day-time'>
            <p>{day}</p>
            <p>{time}</p>
        </div>
    )
}

export default Time
