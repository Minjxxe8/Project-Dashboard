import React, { useState } from "react";

const CategorySelect = ({
                            onChange,
                        }: {
    onChange: (value: number | string) => void;
}) => {
    const [selectedCategory, setSelectedCategory] = useState<number | "">("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10) || "";
        setSelectedCategory(value);
        onChange(value);
    };

    return (
        <div className="max-w-sm mx-auto mt-6">
            <label htmlFor="category" className="block text-sm font-medium mb-2">
                Catégorie
            </label>
            <select
                id="category"
                value={selectedCategory}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
            >
                <option value={1}>Book</option>
                <option value={2}>Film</option>
                <option value={3}>Game</option>
                <option value={4}>Webtoon</option>
            </select>
        </div>
    );
};

export default CategorySelect;
