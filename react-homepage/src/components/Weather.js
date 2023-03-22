import { useFetch } from '../hooks/UseFetch';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { roundInteger } from './Helpers';
import { faWind, faUmbrella, faMugHot, faThermometerHalf, faCloudSun, faSun, faAdjust, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import '../styles/Weather.css';


const Weather = () => {

    const CODES = {
        '0': "Clear sky",
        '1': "Mainly clear",
        '2': "Partly cloudy",
        '3': "Overcast",
        '45': "Fog",
        '48': "Depositing rime fog",
        '51': "Light drizzle",
        '53': "Moderate drizzle",
        '55': "Dense drizzle",
        '56': "Light freezing drizzle",
        '57': "Dense freezing drizzle",
        '61': "Slight rain",
        '63': "Moderate rain",
        '65': "Heavy rain",
        '66': "Light freezing rain",
        '67': "Heavy freezing rain",
        '71': "Slight snow fall",
        '73': "Moderate snow fall",
        '75': "Heavy snow fall",
        '77': "Snow grains",
        '80': "Slight rain showers",
        '81': "Moderate rain showers",
        '82': "Violent rain showers",
        '85': "Slight snow showers",
        '86': "Heavy snow showers",
        '95': "Thunderstorms",
        '96': "Thunderstorms with slight hail",
        '99': "Thunderstorms with heavy hail",
    }

    // Kingsport, TN coordinates
    const LAT = '36.55';
    const LONG = '-82.56';
    const CITY = 'Kingsport'

    const [latitude, setLatitude] = useState(LAT);
    const [longitude, setLongitude] = useState(LONG);
    const [cityName, setCityName] = useState(CITY);
    const [cityName2, setCityName2] = useState('');
    const [weatherUrl, setWeatherUrl] = useState(null);

    useEffect(() => {
        setWeatherUrl(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`)


    }, [latitude, longitude])

    const { data, isLoading, errorMessage } = useFetch(weatherUrl);

    function changeCoordinates() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setCityName('Your Location');
                setCityName2(`(Lat: ${roundInteger(position.coords.latitude)} Lon: ${roundInteger(position.coords.longitude)})`)
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    return (
        <div className='weather'>

            {errorMessage && <p>Weather data not available.</p>}
            {data &&
                <div>

                    <div className='weather-box box'>

                        <div className='heading'>

                            Weather in {cityName}...<br></br><span className='small-text'>{cityName2}</span>
                        </div>
                        {isLoading ? <p>Loading Weather data...</p> :
                            <div className='weather-details'>
                                <div className="sub subgroup">
                                    <div className='big-text standout'>
                                        {data.current_weather.temperature}&deg;
                                    </div>
                                    <div className='weather-desc standout '>
                                        <p>{CODES[data.current_weather.weathercode]}</p>
                                    </div>
                                </div>

                                <div className="grid">
                                    <div className="sub">
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faThermometerHalf}></FontAwesomeIcon>
                                        </div>
                                        <div>
                                            <p className="title"> High / Low </p>
                                            <p className='small-text'>
                                                {data.daily.temperature_2m_max[0]}&deg;
                                                &nbsp;/&nbsp;
                                                {data.daily.temperature_2m_min[0]}&deg;
                                            </p>
                                        </div>
                                    </div>
                                    <div className="sub">
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faWind} ></FontAwesomeIcon>
                                        </div>
                                        <div>
                                            <p className="title">Wind</p>
                                            <p className='small-text'>{data.current_weather.windspeed} mph
                                            </p>
                                        </div>
                                    </div>
                                    <div className="sub">
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faUmbrella}></FontAwesomeIcon>
                                        </div>
                                        <div>
                                            <p className="title">precipitation</p>
                                            <p className='small-text'>
                                                {data.hourly.precipitation_probability[0]}%
                                            </p>
                                        </div>
                                    </div>
                                    <div className='sub'>
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faMugHot} ></FontAwesomeIcon>
                                        </div>
                                        <div>
                                            <p className='title'>Humidity</p>
                                            <p className='small-text'>{data.hourly.relativehumidity_2m[0]}%</p>
                                        </div>
                                    </div>
                                    <div className='sub'>
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faSun} ></FontAwesomeIcon>
                                        </div>
                                        <div>
                                            <p className='title'>UV Index</p>
                                            <p className='small-text'>{data.daily.uv_index_max[0]} of 10 </p>
                                        </div>
                                    </div>
                                    <div className='sub'>
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faAdjust} ></FontAwesomeIcon>
                                        </div>
                                        <div>
                                            <p className='title'>Sunrise / Sunset</p>
                                            <p className='small-text'>{new Date(data.daily.sunrise[0]).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true
                                            })} / {new Date(data.daily.sunset[0]).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true
                                            })} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='btn-div'>
                            <button className='btn' onClick={changeCoordinates} >
                                <FontAwesomeIcon className='icon' icon={faCloudSun} ></FontAwesomeIcon>
                                Get Your Weather&nbsp;
                                <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
                            </button>
                        </div>

                        <div className='credit'>Data from <a href="https://open-meteo.com/" target='_blank' rel='noreferrer'>Open-Meteo.com</a></div>
                    </div>

                </div>



            }

        </div >
    )
}

export default Weather
