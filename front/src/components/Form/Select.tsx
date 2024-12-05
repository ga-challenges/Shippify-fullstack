import { forwardRef, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface OptionType {
    text: string;
    value: string | number | null;
}

export interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options?: Array<OptionType | string>;
}

const InputSelect = forwardRef<HTMLSelectElement, SelectInputProps>(
    ({ id, children, options = [], ...rest }, ref) => (
        <select
            id={id}
            className={twMerge('duration-150 h-10 border-[1px] w-full border-gray-300 active:border-secondary py-2 px-3 focus:border-secondary outline-none rounded-md text-gray-500 placeholder:text-gray-300 font-extralight text-sm tracking-wide')}
            ref={ref}
            {...rest}
        >
            {children}
            {options.map((item, index) => {
                if (typeof item === 'string') {
                    return <option key={index} value={item} style={{ textAlign: 'center' }}> {item} </option>;
                }

                return (
                    <option key={index} value={item.value || undefined} style={{ textAlign: 'center' }}> {item.text} </option>
                );
            })}
        </select>
    )
);

export default InputSelect;
