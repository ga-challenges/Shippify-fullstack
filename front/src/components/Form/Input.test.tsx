import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { InputText } from "./Input";
import '@testing-library/jest-dom'

describe("InputText Component", () => {
  it("renders correctly with default props", () => {
    render(<InputText data-testid="input-text" placeholder="Enter text" />);

    const inputElement = screen.getByTestId("input-text");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", "Enter text");
    expect(inputElement).toHaveClass(
      "border-[1px] border-gray-300 active:border-secondary focus:border-secondary outline-none w-full h-6 rounded-md text-gray-500 placeholder:text-gray-300 px-3 py-[18px] font-extralight text-sm tracking-wide"
    );
  });

  it("applies custom classes when passed via className", () => {
    render(<InputText data-testid="input-text" className="custom-class" />);

    const inputElement = screen.getByTestId("input-text");
    expect(inputElement).toHaveClass("custom-class");
  });

  it("renders with 'invalid' styles when the invalid prop is true", () => {
    render(<InputText data-testid="input-text" invalid />);

    const inputElement = screen.getByTestId("input-text");
    expect(inputElement).toHaveClass("border-red-600 focus:border-red-600");
  });

  it("is disabled when the disabled prop is true", () => {
    render(<InputText data-testid="input-text" disabled />);

    const inputElement = screen.getByTestId("input-text");
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass("disabled:bg-gray-200");
  });

  it("updates value on change", () => {
    render(<InputText data-testid="input-text" />);

    const inputElement = screen.getByTestId("input-text") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Hello World" } });

    expect(inputElement.value).toBe("Hello World");
  });

  it("supports the 'mask' prop (if implemented in the future)", () => {
    render(<InputText data-testid="input-text" mask={["###-###"]} />);
    const inputElement = screen.getByTestId("input-text");
    expect(inputElement).toBeInTheDocument();
  });
});
