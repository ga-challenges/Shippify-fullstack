import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string
    bgColor?: string
    bgHoverColor?: string
    target?: string
}

export default function Button({ href, children, className: outClassName, target = '_self', ...props }: ButtonProps) {
    const className='py-2 block disabled:opacity-25 px-8 bg-orange-300 text-white text-center rounded-lg duration-75 disabled:hover:bg-primary';

    if(href) {
        return <a target={target} href={href} className={twMerge(`${className}`, `${outClassName}`)}>{ children }</a>;
    }

    return (
        <button className={
            twMerge(`${className}`, `${outClassName}`)
        } { ...props }> {children} </button>
    );
}
