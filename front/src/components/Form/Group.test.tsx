import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import InputGroup from "./Group";

describe("InputGroup", () => {
    test("renders the label correctly", () => {
        render(
            <InputGroup label="Test Label">
                <input type="text" />
            </InputGroup>
        )
        
        const label = screen.getByText("Test Label")
        expect(label).toBeInTheDocument()
    })
    
    test("passes the correct id to the input", () => {
        render(
            <InputGroup label="Test Label">
                <input type="text" />
            </InputGroup>
        )

        const input = screen.getByRole("textbox")
        expect(input).toHaveAttribute("id")
        expect(input.id).toBeTruthy() // Checks if the id is correctly generated
    })

    test("renders additional child elements", () => {
        render(
            <InputGroup label="Test Label">
                <input type="text" />
                <span>Additional element</span>
            </InputGroup>
        )

        const span = screen.getByText("Additional element")
        expect(span).toBeInTheDocument()
    })
})
