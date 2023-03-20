import { useFetch } from '../hooks/UseFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

const Quote = () => {

    const { data, isLoading, errorMessage } = useFetch('https://api.quotable.io/random?maxLength=50');

    return (
        <>
            {!errorMessage &&

                <div className='box quote-box'>
                    <div className='heading'>
                        <FontAwesomeIcon className='icon' icon={faQuoteLeft}></FontAwesomeIcon>
                        Daily Quote...
                    </div>
                    {isLoading && <p>loading...</p>}
                    {data &&
                        <div className='quote'>
                            <div className='text'>"{data.content}"
                            </div>
                            <div className='author'>... {data.author}</div>
                        </div>
                    }
                </div>

            }
        </>
    )
}

export default Quote
