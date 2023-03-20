import Weather from './Weather';
import Time from './Time';
import Cat from './Cat';
import Quote from './Quote';
import '../styles/RightRail.css'




const RightRail = () => {
    return (
        <div className='today'>
            <p className='title'>Today...</p>
            <Time />
            <Quote />
            <Weather />
            <Cat />
        </div>
    )
}

export default RightRail
