//Il aura tou les usestates pour récupérer les datas du backend et less traiter pour que le JArPage ne fasse que du frontend


import { useEffect, useState } from "react";
import type {EmojiOption} from "../../typescript/emojiOptions.ts";
import {fetchEmojis} from "../api/FetchJar.tsx";


export function useEmojis() {
    const [emojis, setEmojis] = useState<EmojiOption[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const load = async () => {
            const data = await fetchEmojis();
            setEmojis(data);
            setLoading(false);
            selectedIndex && setSelectedIndex(null);
        };
        load();
    }, []);


    return {
        emojis,
        loading,
        selectedIndex,
        setSelectedIndex,
    };
}
