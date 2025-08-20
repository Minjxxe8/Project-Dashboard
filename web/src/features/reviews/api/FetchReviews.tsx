export async function fetchReviews(review: {
    title: string;
    rating: number;
    occuredAt: string;
    review: string;
    category: number;
    file: File | null;
}) {
    try {
        const response = await fetch("http://localhost:8080/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        }); if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
}