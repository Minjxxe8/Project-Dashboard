export interface Memory {
    name: string;
    occuredAt: string;
    content: string;
    title: string;
    emotion: string;
    jar: string;
}

export async function getJar() {
    try {
        const response = await fetch(`http://localhost:8080/api/memories/all`, {
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
        console.error("Error when getting jar", error);
        throw error;
    }
}
