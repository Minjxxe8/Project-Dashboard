import React, {useState, useMemo} from 'react';
import { MemoriesList } from "../hooks/HooksJarData.tsx";
import type { Memory } from "../api/GetJar.tsx";
import {type EmojiOption, emojiOptions} from "../../typescript/emojiOptions.ts";


interface SortOption {
    value: string;
    label: string;
}

const MemoryFilter: React.FC = () => {

    const { memories } = MemoriesList();

    // États des filtres
    const [titleFilter, setTitleFilter] = useState<string>('');
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [nameInput, setNameInput] = useState<string>('');
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [contentFilter, setContentFilter] = useState<string>('');
    const [selectedEmotion, setSelectedEmotion] = useState<string>('');
    const [selectedJar, setSelectedJar] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('date-desc');

    // Données d'exemple basées sur votre image falseMemories

    const jarTypes: string[] = ['Souvenirs', 'potins'];
    const sortOptions: SortOption[] = [
        { value: 'date-desc', label: 'Plus récent au plus ancien' },
        { value: 'date-asc', label: 'Plus ancien au plus récent' },
        { value: 'emotion', label: 'Par émotion' },
        { value: 'name', label: 'Par nom (alphabétique)' }
    ];

    // Fonctions de gestion
    const addName = (): void => {
        if (nameInput.trim() && !selectedNames.includes(nameInput.trim())) {
            setSelectedNames([...selectedNames, nameInput.trim()]);
            setNameInput('');
        }
    };

    const removeName = (name: string): void => {
        setSelectedNames(selectedNames.filter((n: string) => n !== name));
    };

    const clearAllFilters = (): void => {
        setTitleFilter('');
        setSelectedNames([]);
        setNameInput('');
        setDateFrom('');
        setDateTo('');
        setContentFilter('');
        setSelectedEmotion('');
        setSelectedJar('');
    };

    const activeFiltersCount = useMemo((): number => {
        let count = 0;
        if (titleFilter) count++;
        if (selectedNames.length > 0) count++;
        if (dateFrom || dateTo) count++;
        if (contentFilter) count++;
        if (selectedEmotion) count++;
        if (selectedJar) count++;
        return count;
    }, [titleFilter, selectedNames, dateFrom, dateTo, contentFilter, selectedEmotion, selectedJar]);

    // Filtrage des mémoires
    const filteredMemories = useMemo((): Memory[] => {
        return memories.filter((memory: Memory) => {
            // Filtre par titre
            if (titleFilter && !memory.title.toLowerCase().includes(titleFilter.toLowerCase())) {
                return false;
            }

            // Filtre par noms
            if (selectedNames.length > 0) {
                // Si la base de données renvoie une chaîne simple pour memory.name
                const memoryNames = memory.name.split(',').map(name => name.trim());
                const hasMatchingName = selectedNames.some((filterName: string) =>
                    memoryNames.some((memoryName: string) =>
                        memoryName.toLowerCase().includes(filterName.toLowerCase())
                    )
                );
                if (!hasMatchingName) return false;
            }

            // Filtre par date
            if (dateFrom && memory.occuredAt < dateFrom) return false;
            if (dateTo && memory.occuredAt > dateTo) return false;

            // Filtre par contenu
            if (contentFilter && !memory.content.toLowerCase().includes(contentFilter.toLowerCase())) {
                return false;
            }

            // Filtre par émotion
            if (selectedEmotion && memory.emotion !== selectedEmotion) return false;

            // Filtre par jar
            if (selectedJar && memory.jar !== selectedJar) return false;

            return true;
        });
    }, [titleFilter, selectedNames, dateFrom, dateTo, contentFilter, selectedEmotion, selectedJar]);

    // Tri des mémoires
    const sortedMemories = useMemo((): Memory[] => {
        const sorted = [...filteredMemories];

        switch (sortBy) {
            case 'date-desc':
                return sorted.sort((a: Memory, b: Memory) => new Date(b.occuredAt).getTime() - new Date(a.occuredAt).getTime());
            case 'date-asc':
                return sorted.sort((a: Memory, b: Memory) => new Date(a.occuredAt).getTime() - new Date(b.occuredAt).getTime());
            case 'emotion':
                return sorted.sort((a: Memory, b: Memory) => a.emotion.localeCompare(b.emotion));
            case 'name':
                return sorted.sort((a: Memory, b: Memory) => a.title.localeCompare(b.title));
            default:
                return sorted;
        }
    }, [filteredMemories, sortBy]);

    return (
        <div className="w-full p-6 bg-white">
            {/* Barre de filtres */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {/* Icône Filter manuelle */}
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                        </svg>
                        <span className="text-gray-700 font-medium">
              {activeFiltersCount} Filter{activeFiltersCount !== 1 ? 's' : ''}
            </span>
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={clearAllFilters}
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm">Sort</span>
                        <select
                            value={sortBy}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {sortOptions.map((option: SortOption) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-6">
                    {/* Title Filter */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={titleFilter}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Rechercher dans le titre..."
                        />
                    </div>

                    {/* Names Filter */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Names</label>
                        <div className="space-y-2">
                            <div className="flex gap-1">
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
                                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addName()}
                                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ajouter un nom..."
                                />

                            </div>
                            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                                {selectedNames.map((name: string) => (
                                    <span
                                        key={name}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                    >
                    {name}
                                        <button onClick={() => removeName(name)}>
                      {/* Icône X manuelle */}
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Date Filter */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Occurred At</label>
                        <div className="space-y-2">
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Content Filter */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <input
                            type="text"
                            value={contentFilter}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Rechercher dans le contenu..."
                        />
                    </div>

                    {/* Emotion Filter */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Emotion</label>
                        <select
                            value={selectedEmotion}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedEmotion(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Toutes les émotions</option>
                            {emojiOptions.map((emotion: EmojiOption) => (
                                <option key={emotion.emoji} value={emotion.emoji}>
                                    {emotion.emoji} {emotion.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Jar Filter */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Jar</label>
                        <select
                            value={selectedJar}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedJar(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Tous les types</option>
                            {jarTypes.map((jar: string) => (
                                <option key={jar} value={jar}>{jar}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>



            <div className="mt-4 text-sm text-gray-500 text-center">
                {sortedMemories.length} résultat{sortedMemories.length !== 1 ? 's' : ''} sur {memories.length} mémoire{memories.length !== 1 ? 's' : ''}
            </div>
        </div>
    );
};

export default MemoryFilter;