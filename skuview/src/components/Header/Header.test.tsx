import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react"
import Header from "./Header";

describe("Header", () => {
    
    it("should render header component", () => {
        const screen = renderComponent()

        const header = screen.getByTestId("header")
        expect(header).toBeInTheDocument()
    }
    )

    it("should render correct header title", () => {
        const screen = renderComponent()

        const header = screen.getByTestId("header")

        expect(header).toHaveTextContent(/GB SKUMANAGER/i)
    })
})

function renderComponent() {
    return render(<Header />)
}