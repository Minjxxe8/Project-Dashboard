import React from "react";

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
                                                          label,
                                                          value,
                                                          onChange,
                                                      }) => {
    return (
        <div className="relative w-full">
            <input
                type="date"
                value={value}
                onChange={onChange}
                className="peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
                placeholder=" "
            />
            <label
                className={`
          absolute left-0 top-2 text-sm text-gray-500 transition-all 
          peer-placeholder-shown:top-6 peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-gray-400 
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500
        `}
            >
                {label}
            </label>
        </div>
    );
};
