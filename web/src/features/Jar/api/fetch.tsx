//Il fera les appels api du backend pour récupérer les données dont ont as besoin

import {emojiOptions} from "../../typescript/emojiOptions.ts";

export async function fetchEmojis() {
    return new Promise<typeof emojiOptions>((resolve) => {
        setTimeout(() => {
            resolve(emojiOptions);
        }, 300);
    });
}

export async function submitEmotion(emoji: string) {
    return new Promise<void>((resolve) => {
        console.log("Emotion envoyée au backend :", emoji);
        setTimeout(() => {
            resolve();
        }, 300);
    });
}