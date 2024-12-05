import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const classNameRaw = "border-[1px] border-gray-300 active:border-secondary focus:border-secondary outline-none w-full h-6 rounded-md text-gray-500 placeholder:text-gray-300 px-3 py-[18px] font-extralight text-sm tracking-wide"

export interface TextInputInputProps extends InputHTMLAttributes<HTMLInputElement> {
    invalid?: boolean
    mask?: string[] | undefined
}

export const InputText = forwardRef<HTMLInputElement, TextInputInputProps>(({ className, invalid = false, ...props }, ref) => (
    <input
        className={twMerge(classNameRaw, className, invalid && 'border-red-600 focus:border-red-600', 'disabled:bg-gray-200')}
        ref={ref}
        {...props}
    />
));


