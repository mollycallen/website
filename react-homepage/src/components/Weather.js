import { useFetch } from '../hooks/UseFetch';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    const CITY = 'Kingsport, TN';

    const [latitude, setLatitude] = useState(LAT);
    const [longitude, setLongitude] = useState(LONG);
    const [cityName, setCityName] = useState(CITY);
    const [weatherUrl, setWeatherUrl] = useState(null);

    useEffect(() => {

        setWeatherUrl(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`);

    }, [latitude, longitude])

    async function getCityName() {

        await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=1012f9575c9243dfb3bf2e47af182a28`, { method: 'GET' })
            .then(response => response.json())
            .then(result => {
                console.log(result.features[0].properties)
                setCityName(`${result.features[0].properties.city}, ${result.features[0].properties.state_code}`)
            })

            .catch(error => { setCityName(`Lat: ${latitude} Lon: ${longitude}`) });
    }

    const { data, isLoading, errorMessage } = useFetch(weatherUrl);



    function changeCoordinates() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                getCityName();
            })
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
                            Weather in {cityName ? cityName : 'Your Location'}...
                        </div>
                        {isLoading ? <p>Loading Weather data...</p> :
                            <div className='weather-details'>
                                <div className="current">
                                    <div className='big-text standout'>
                                        {data.current_weather.temperature}&deg; F
                                    </div>
                                    <div>
                                        <div className='feels-like' >
                                            Feels like {data.hourly.apparent_temperature[new Date().getHours()]}&deg;
                                        </div>
                                        <div>
                                            {CODES[data.current_weather.weathercode]}
                                        </div>
                                    </div>
                                </div>
                                <div className='weather-desc '>
                                    <p></p>
                                </div>
                                <div className="grid">
                                    <div className="grid-row">
                                        <p className="title">High</p>
                                        <p >
                                            {data.daily.temperature_2m_max[0]}&deg;

                                        </p>
                                    </div>
                                    <div className="grid-row">
                                        <p className="title">Low </p>
                                        <p >
                                            {data.daily.temperature_2m_min[0]}&deg;
                                        </p>
                                    </div>
                                    <div className="grid-row">
                                        <p className="title">Wind</p>
                                        <p>{data.current_weather.windspeed} mph
                                        </p>
                                    </div>
                                    <div className="grid-row">
                                        <p className="title">precip.</p>
                                        <p>
                                            {data.hourly.precipitation_probability[new Date().getHours()]}%
                                        </p>
                                    </div>
                                    <div className='grid-row'>
                                        <p className='title'>Humidity</p>
                                        <p >{data.hourly.relativehumidity_2m[new Date().getHours()]}%</p>
                                    </div>
                                    <div className='grid-row'>
                                        <p className='title'>UV Index</p>
                                        <p >{data.daily.uv_index_max[0]} of 10 </p>
                                    </div>
                                    <div className='grid-row'>
                                        <p className='title'>Sunrise </p>
                                        <p >{new Date(data.daily.sunrise[0]).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true
                                        })}
                                        </p>
                                    </div>
                                    <div className='grid-row'>
                                        <p className='title'>Sunset</p>
                                        <p>
                                            {new Date(data.daily.sunset[0]).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className='btn-div'>
                                    <button className='btn' onClick={changeCoordinates} >
                                        <FontAwesomeIcon className='icon' icon={faCloudSun} ></FontAwesomeIcon>
                                        Get Your Weather&nbsp;
                                        <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                        }


                        <div className='credit small-text'>* Data from <a href="https://open-meteo.com/" target='_blank' rel='noreferrer'>Open-Meteo.com</a></div>
                    </div>

                </div>



            }

        </div >
    )
}

export default Weather
