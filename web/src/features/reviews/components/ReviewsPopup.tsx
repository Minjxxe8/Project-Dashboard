import {FloatingInput} from "../../../shared/components/FloatingInput.tsx";
import {DatePicker} from "../../../shared/components/DatePicker.tsx";
import {useState} from "react";
import {ValidatedFloatingInput} from "../../../shared/components/ValidatedFloatingInput.tsx";
import {fetchReviews} from "../api/FetchReviews.tsx";
import CategorySelect from "./CategorySelector.tsx";

export default function ReviewsPopup( { onclose }: { onclose: () => void }) {

    const [value, setValue] = useState(5);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<number | "">("");
    const [rating, setRating] = useState(5);
    const [selectedDate, setSelectedDate] = useState("");
    const [review, setReview] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState(false);

    const handleButtonClick = async () => {
        if (!title || !rating || !selectedDate || !review) {
            console.error("All fields are required");
            setError(true);
            return;
        }

        const reviewData = {
            title,
            rating: value,
            occuredAt: new Date(selectedDate).toISOString(),
            review,
            category: category !== "" ? category.toString() : undefined,
            file
        };

        console.log("Review data to be sent:", reviewData);

        try {
            await fetchReviews(reviewData);
            onclose();
        } catch (error) {
            console.error("Error when fetching data:", error);
        }
    }

    return (
        <>
            { error && (
                <div className="absolute top-2 bg-red-500 text-white z-30 py-3 px-4 rounded-lg text-center w-fit left-1/2 -translate-x-1/2">
                    All fields are required
                </div>
            )}
            {setTimeout(() => setError(false), 3000)}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-[600px] w-[950px] rounded-2xl shadow-[0px_0px_67px_34px_rgba(0,_0,_0,_0.1)] flex flex-col p-10 backdrop-blur-3xl border-1">
                <div className="absolute top-6 right-10 cursor-pointer" onClick={onclose}>X</div>
                <h2 className="text-2xl text-center mb-3">Add Reviews</h2>

                <div className="flex gap-6">
                    <FloatingInput value={title} onChange={e => setTitle(e.target.value)} label="Title"/>
                    <CategorySelect onChange={value => {
                        if (typeof value !== "number") {
                            setCategory(1);
                        } else {
                            setCategory(Number(value));
                        }
                    }} />
                </div>

                <div className="flex gap-6 items-center my-5">
                    <input type="range" min={0} max={10} value={rating} onChange={e => {
                        const newValue = Number(e.target.value);
                        setValue(newValue);
                        setRating(newValue);
                    }} className="flex-1"/>
                    <span className="flex items-center justify-center w-12">{rating}</span>
                    <DatePicker value={selectedDate} onChange={e => setSelectedDate(e.target.value)} label="When did you have finished it ?" className="flex-[2]"/>
                </div>

                <ValidatedFloatingInput value={review} onChange={e => setReview(e.target.value)} label="Review" height="h-50"/>

                <div>
                    <label htmlFor="file-input" className="sr-only">Choose file</label>
                    <input onChange={e => setFile(e.target.files?.[0] || null)} type="file" name="file-input" id="file-input" className="block w-full border mt-2 border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                    file:bg-gray-50 file:border-0
                    file:me-4
                    file:py-3 file:px-4
                    dark:file:bg-neutral-200" />
                </div>

                <button onClick={handleButtonClick} type="button" className="
                        text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800
                        w-fit place-self-end mt-5">
                    Finish
                </button>

            </div>
        </>
)
}