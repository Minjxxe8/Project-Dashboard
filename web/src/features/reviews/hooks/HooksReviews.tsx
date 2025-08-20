import {useEffect, useState} from "react";
import {getReviews, type Reviews} from "../api/GetReviews.tsx";

export function useReviews() {
    const [reviews, setReviews] = useState<Reviews[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load()  {
            try {
                const data = await getReviews();
                setReviews(data);
            } catch (err : any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return {
        reviews,
        loading,
        error
    };
}

