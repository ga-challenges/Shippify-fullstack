import React, { useId } from "react"
import InputLabel from "./Label"

export interface InputGroupProps {
    label: string,
    children: React.ReactNode
}

export default function InputGroup({ label, children }: InputGroupProps) {
    const id = useId()
    const childrenArray = React.Children.toArray(children)

    return (
        <div className="flex flex-col gap-2 w-full">
            <InputLabel id={id}>{label}</InputLabel>
            {React.cloneElement(childrenArray[0] as React.ReactElement, { id })}
            {childrenArray.slice(1).map((child, index) => (
                <React.Fragment key={index}>{child}</React.Fragment>
            ))}
        </div>
    )
}