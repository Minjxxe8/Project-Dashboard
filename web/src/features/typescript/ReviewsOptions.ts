export interface Review {
    id: number;
    title: string;
    coverUrl: string;
    rating: number;
    reviewText: string;
    date: string;
}

export const reviews: Review[] = [
    {
        id: 1,
        title: "The Last of Us",
        coverUrl: "https://via.placeholder.com/50x75",
        rating: 9,
        reviewText: "Excellent storytelling and immersive gameplay.",
        date: "2025-08-01",
    },
    {
        id: 2,
        title: "Cyberpunk 2077",
        coverUrl: "https://via.placeholder.com/50x75",
        rating: 7.5,
        reviewText: "Good world-building, but still buggy.",
        date: "2025-08-03",
    },
];