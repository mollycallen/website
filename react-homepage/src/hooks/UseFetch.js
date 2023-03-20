import { useState, useEffect } from "react";

export function useFetch(url, options) {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url, options);
                if (!res.ok) {
                    throw new Error(`HTTP error status: ${res.status}`);
                }
                const jsonData = await res.json();
                setData(jsonData);
                setIsLoading(false);
                setError(null)
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();

    }, [url, options])

    return { data, isLoading, error };
}