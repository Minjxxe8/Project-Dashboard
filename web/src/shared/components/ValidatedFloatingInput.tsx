import React, { useState } from "react";

interface ValidatedFloatingInputProps {
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    height: string;
}

export const ValidatedFloatingInput: React.FC<ValidatedFloatingInputProps> = ({
      label,
      value,
      onChange,
      required = true,
        height,
  }) => {
    const [touched, setTouched] = useState(false);

    // @ts-ignore
    const isError = required && touched && value === "";

    return (
        <div className="relative w-full mb-4">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onBlur={() => setTouched(true)}
                onFocus={() => setTouched(true)}
                className={`
          peer w-full rounded-md border bg-transparent pt-6 pb-2 px-3 text-sm text-gray-900 
          placeholder-transparent focus:outline-none transition-all
          ${height ?? "h-12"}
          ${isError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}
        `}
                placeholder={label}
            />
            <label
                className={`
          absolute left-3 top-2 text-sm transition-all pointer-events-none
          ${isError ? "text-red-500" : "text-gray-500"}
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-gray-400
          peer-focus:top-2 peer-focus:text-sm 
          ${isError ? "peer-focus:text-red-500" : "peer-focus:text-blue-500"}
        `}
            >
                {label}
            </label>
            {isError && (
                <p className="mt-1 text-sm text-red-500">Ce champ est requis.</p>
            )}
        </div>
    );
};
