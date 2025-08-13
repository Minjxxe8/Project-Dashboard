import React from "react";
import { MemoriesList } from "../hooks/HooksJarData.tsx";


const JarTable: React.FC = () => {

    const { memories, loading, error } = MemoriesList();

    if (loading) {
        return <p className="text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="overflow-x-auto rounded-lg shadow-md mt-8 mx-10 mt-6">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Names</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Occured At</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Content</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Emotion</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Jar</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700"></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {memories.map((memory) => (
                    <tr key={memory.name}>
                        <td className="px-4 py-3 text-sm text-gray-800">{memory.title}</td>
                        <td className="px-4 py-3">{memory.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                            {memory.occuredAt.split("T")[0]}
                        </td>

                        <td className="px-4 py-3 text-sm text-gray-700">{memory.content}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{memory.emotion}</td>
                        <td className="px-4 py-3 text-sm text-gray-500 text-center">{memory.jar}</td>
                        <td className="px-4 py-3 text-center">
                            <button className="text-blue-600 hover:underline cursor-pointer text-sm font-medium">Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default JarTable;