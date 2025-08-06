//Il fera les appels api du backend pour récupérer les données dont ont as besoin

import {emojiOptions} from "../../typescript/emojiOptions.ts";

export async function fetchEmojis() {
    return new Promise<typeof emojiOptions>((resolve) => {
        setTimeout(() => {
            resolve(emojiOptions);
        }, 300);
    });
}

export interface Memory {
    name: string;
    date: string;
    content: string;
    title: string;
    emotion: string;
    jar: string;
}

export async function createMemory(memory: Memory) {
    try {
        const response = await fetch("http://localhost:8080/api/memories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memory),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error when creating memory", error);
        throw error;
    }
}
