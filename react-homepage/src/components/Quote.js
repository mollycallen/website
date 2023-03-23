import { useFetch } from '../hooks/UseFetch';


const Quote = () => {

    const { data, isLoading, errorMessage } = useFetch('https://api.quotable.io/random?maxLength=50');

    return (
        <>
            {!errorMessage &&

                <div className='box quote-box'>
                    <div className='heading'>

                        Daily Quote...
                    </div>
                    {isLoading && <p>loading...</p>}
                    {data &&
                        <div className='quote'>
                            <div className='text'>
                                {data.content}"
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
