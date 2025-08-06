import {useEffect, useState} from "react";
import type {Review} from "../../typescript/ReviewsOptions.ts";
import {fetchReviews} from "../api/FetchReviews.tsx";

export function useReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchReviews();
            setReviews(data);
            setLoading(false);
        };
        load();
    }, []);

    return {
        reviews,
        loading,
    };
}

