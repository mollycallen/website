import Weather from './Weather';
import Cat from './Cat';
import Quote from './Quote';
import '../styles/RightRail.css'

const RightRail = () => {
    return (
        <div className='today'>
            <Quote />
            <Weather />
            <Cat />
        </div>
    )
}

export default RightRail
