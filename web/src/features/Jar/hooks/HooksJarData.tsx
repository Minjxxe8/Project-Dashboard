import {useEffect, useState} from "react";
import {getJar, type Memory} from "../api/GetJar.tsx";

export function MemoriesList() {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMemories() {
            try {
                const data = await getJar();
                setMemories(data);
            } catch (err : any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMemories();
    }, []);

    return {
        memories,
        loading,
        error
    }

}