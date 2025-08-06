
import { useEmojis } from "../../features/Jar/hooks/HooksEmotions.tsx";

interface EmojiSelectorProps {
    onSelect?: (emoji: string) => void;
}

export default function EmojiSelector({ onSelect }: EmojiSelectorProps) {

    const {
        emojis,
        loading,
        selectedIndex,
        setSelectedIndex,
    } = useEmojis();

    if (loading) return <p className="text-gray-500">Loading...</p>;

    const handleClick = async (index: number) => {
        setSelectedIndex(index);
        const emoji = emojis[index]?.emoji;
        if (onSelect && emoji) {
            onSelect(emoji);
        }
    };

    return (
        <div className="flex justify-between items-center gap-4">
            {emojis.map((option, index) => (
                <button
                    key={option.emoji}
                    onClick={() => handleClick(index)}
                    className={`
            text-3xl transition-transform transform
            ${selectedIndex === index ? "scale-125" : "scale-100"}
            hover:scale-110 focus:outline-none cursor-pointer
          `}
                    aria-label={option.label}
                >
                    {option.emoji}
                </button>
            ))}
        </div>
    );
};
