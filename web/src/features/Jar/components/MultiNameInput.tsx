import React, { useState } from "react";

interface MultiNameInputProps {
    label?: string;
    values: string[];
    onChange: (newValues: string[]) => void;
}

export const MultiNameInput: React.FC<MultiNameInputProps> = ({ label = "Name", values, onChange }) => {
    const [currentInput, setCurrentInput] = useState("");

    const handleAddName = () => {
        const trimmed = currentInput.trim();
        if (trimmed && !values.includes(trimmed)) {
            onChange([...values, trimmed]);
            setCurrentInput("");
        }
    };

    const handleRemoveName = (name: string) => {
        onChange(values.filter(n => n !== name));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddName();
        }
    };

    return (
        <div className="w-full">
            <div className="relative">
                <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <label className="absolute left-0 top-2 text-sm text-gray-500">
                    {label}
                </label>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {values.map((name, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                        {name}
                        <button
                            type="button"
                            onClick={() => handleRemoveName(name)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};
