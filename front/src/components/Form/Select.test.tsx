import { render, screen, fireEvent } from "@testing-library/react";
import InputSelect from "./Select";
import '@testing-library/jest-dom'

describe("InputSelect Component", () => {
  it("renders with default props", () => {
    render(<InputSelect data-testid="select-input" />);

    const selectElement = screen.getByTestId("select-input");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveClass(
      "duration-150 h-10 border-[1px] w-full border-gray-300 active:border-secondary py-2 px-3 focus:border-secondary outline-none rounded-md text-gray-500 placeholder:text-gray-300 font-extralight text-sm tracking-wide"
    );
  });

  it("renders options passed as strings", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    render(<InputSelect data-testid="select-input" options={options} />);

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("renders options passed as objects", () => {
    const options = [
      { text: "Option A", value: "a" },
      { text: "Option B", value: "b" },
    ];
    render(<InputSelect data-testid="select-input" options={options} />);

    options.forEach((option) => {
      expect(screen.getByText(option.text)).toBeInTheDocument();
    });
  });

  it("allows selecting an option", () => {
    const options = ["Option 1", "Option 2"];
    render(<InputSelect data-testid="select-input" options={options} />);

    const selectElement = screen.getByTestId("select-input") as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: "Option 2" } });

    expect(selectElement.value).toBe("Option 2");
  });

  it("renders children when provided", () => {
    render(
      <InputSelect options={[
        { text: 'Child Option', value: 'child' },
      ]} data-testid="select-input">
      </InputSelect>
    );

    expect(screen.getByText("Child Option")).toBeInTheDocument();
  });
});
