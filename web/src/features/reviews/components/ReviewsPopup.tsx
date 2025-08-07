import {FloatingInput} from "../../../shared/components/FloatingInput.tsx";
import {DatePicker} from "../../../shared/components/DatePicker.tsx";
import {useState} from "react";
import {ValidatedFloatingInput} from "../../../shared/components/ValidatedFloatingInput.tsx";

export default function ReviewsPopup( { onclose }: { onclose: () => void }) {

    const [value, setValue] = useState(5);

    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-[600px] w-[950px] rounded-2xl shadow-[0px_0px_67px_34px_rgba(0,_0,_0,_0.1)] flex flex-col p-10 backdrop-blur-3xl border-1">
            <div className="absolute top-6 right-10 cursor-pointer" onClick={onclose}>X</div>
            <h2 className="text-2xl text-center mb-3">Add Reviews</h2>

            <FloatingInput label="Title"/>

            <div className="flex gap-6 items-center my-5">
                <input type="range" min={0} max={10} value={value} onChange={e => setValue(Number(e.target.value))} className="flex-1"/>
                <span className="flex items-center justify-center w-12">{value}</span>
                <DatePicker label="When did you have finished it ?" className="flex-[2]"/>
            </div>

            <ValidatedFloatingInput label="Review" height="h-50"/>

            <div>
                <label htmlFor="file-input" className="sr-only">Choose file</label>
                <input type="file" name="file-input" id="file-input" className="block w-full border mt-2 border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                file:bg-gray-50 file:border-0
                file:me-4
                file:py-3 file:px-4
                dark:file:bg-neutral-200" />
            </div>

            <button type="button" className="
                    text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800
                    w-fit place-self-end mt-5">
                Finish
            </button>

        </div>
)
}