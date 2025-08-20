export interface Reviews {
    id: string
    title: string;
    rating: number;
    occuredAt: string;
    review: string;
    category: number;
    file: File | null;
}

export async function getReviews() {
    try {
        const response = await fetch(`http://localhost:8080/api/reviews/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error when getting reviews", error);
        throw error;
    }
}