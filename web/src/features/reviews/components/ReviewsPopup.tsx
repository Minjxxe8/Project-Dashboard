import {FloatingInput} from "../../../shared/components/FloatingInput.tsx";
import {DatePicker} from "../../../shared/components/DatePicker.tsx";
import {useState} from "react";

export default function ReviewsPopup() {

    const [value, setValue] = useState(5);

    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-[600px] w-[950px] rounded-2xl shadow-[0px_0px_67px_34px_rgba(0,_0,_0,_0.1)] flex flex-col p-10 backdrop-blur-3xl border-1">
            <h2 className="text-2xl text-center">Add Reviews</h2>
            <FloatingInput label="Title"/>
            <div className="flex gap-6">
                <input type="range" min={0} max={10} value={value} onChange={e => setValue(Number(e.target.value))}
                       className="flex-1"/>
                <span>{value}</span>
                <DatePicker label="When did you have finished it ?" className="flex-[2]"/>
            </div>

        </div>
    )
}