import {FloatingInput} from "../../../shared/components/FloatingInput.tsx";
import {DatePicker} from "../../../shared/components/DatePicker.tsx";

export default function ReviewsPopup() {

    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-[600px] w-[950px] rounded-2xl shadow-[0px_0px_67px_34px_rgba(0,_0,_0,_0.1)] flex flex-col p-10 backdrop-blur-3xl border-1">
            <h2 className="text-2xl text-center">Add Reviews</h2>
            <FloatingInput label="Title"/>
            <div className="flex gap-6">
                <FloatingInput label="Note" />
                <DatePicker label="When did you have finished it ?" />
            </div>
        </div>
    )
}