export interface Reviews {
    title: string;
    rating: number;
    occuredAt: string;
    review: string;
    category: number;
    file: File | null;
    emotion: string;
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