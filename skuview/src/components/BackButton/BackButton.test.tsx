import { fireEvent, render } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import BackButton from "./BackButton"

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}))

describe("BackButton", () => {
	beforeEach(() => {
		mockPush.mockClear()
	})

	it("should render back button", () => {
		const { getByRole } = renderComponent()
		const button = getByRole("button")

		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent("Voltar")
	})

	it("should call router.back when clicked", () => {
		const { getByRole } = renderComponent()
		const button = getByRole("button")

		fireEvent.click(button)

		expect(mockPush).toHaveBeenCalledTimes(1)
	})

	it("should navigate to previous route when provided", () => {
		const previousRoute = "/last-page"
		const { getByRole } = renderComponent(previousRoute)
		const button = getByRole("button")

		fireEvent.click(button)

		expect(mockPush).toHaveBeenCalledWith(previousRoute)
	})
})

function renderComponent(previousRoute: string = "/back/route") {
	return render(<BackButton previusRoute={previousRoute} />)
}