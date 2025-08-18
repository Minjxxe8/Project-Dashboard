import React from "react";
import {useReviews} from "../hooks/HooksReviews.tsx";


const Table: React.FC = () => {
    const {
        reviews,
        loading,
    } = useReviews();

    if (loading) {
        return <p className="text-gray-500">Loading...</p>;
    }
    

    return (
        <div className="overflow-x-auto rounded-lg shadow-md mt-8">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Titre</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Jaquette</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Note</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Review</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700"></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {reviews.map((review) => (
                    <tr key={review.id}>
                        <td className="px-4 py-3 text-sm text-gray-800">{review.title}</td>
                        <td className="px-4 py-3">
                            <img src={review.coverUrl} alt={review.title} className="h-20 rounded shadow-sm" />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">{review.rating}/10</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{review.reviewText}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{review.date}</td>
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

export default Table;
