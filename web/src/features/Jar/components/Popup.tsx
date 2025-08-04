import { FloatingInput } from "./FloatingInput";
import { DatePicker } from "./DatePicker";
import {useState} from "react";
import { ValidatedFloatingInput } from "../../../shared/components/TextInput.tsx"
import EmojiSelector from "../../../shared/components/Emotions.tsx";

function Popup({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [email, setEmail] = useState("");


    return (
        <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-[600px] w-[950px] rounded-2xl shadow-[0px_0px_67px_34px_rgba(0,_0,_0,_0.1)] flex flex-col p-10 backdrop-blur-3xl border-1">
             <div className="absolute top-6 right-10 cursor-pointer" onClick={onClose}>X</div>

            <h1 className="text-2xl text-center">Add Memories</h1>

            <div className="flex mt-6">
                <div className="w-1/2 pr-5">
                    <FloatingInput label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className=" w-1/2 pr-5">
                    <DatePicker label="Choose a date" value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}/>
                </div>
            </div>

            <div className="pt-6">
                <ValidatedFloatingInput
                    label="Memorie"
                    value={email}
                    height="h-65"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="">
                <EmojiSelector onSelect={(emotion: any) => console.log("Émotion choisie :", emotion)} />
            </div>

            <button type="button" className="
                    text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800
                    w-fit place-self-end mt-7">
                Finish
            </button>

        </div>
    )
}

export default Popup;