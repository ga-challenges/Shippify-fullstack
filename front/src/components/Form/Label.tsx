import React from "react"

export interface LabelProps {
    children: React.ReactNode,
    id?: string
}

export default function InputLabel({ children, id }: LabelProps) {
    return (
        <label htmlFor={id} className="d-block text-sm text-gray-600 font-medium tracking-wide"> { children } </label>
    )
}