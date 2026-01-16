import { render } from "@testing-library/react"
import SkuRegisterPage from "./page"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const mockGet = vi.fn()

vi.mock('next/navigation', () => ({
    useSearchParams: () => ({
        get: mockGet,
    }),
    useRouter: vi.fn()
}))

describe("SkuRegisterPage", () => {
    it("should render form title", () => {
        const screen = renderComponent()

        const title = screen.getByRole("heading", { name: /Registro de SKU/i })

        expect(title).toBeInTheDocument()
    })

    it("should render form fields", () => {
        const screen = renderComponent()

        const skuInput = screen.getByLabelText(/sku/i)
        const comercialDescription = screen.getByLabelText(/^Descrição Comercial\*$/i)
        const description = screen.getByLabelText(/^Descrição$/i)
        const status = screen.getByLabelText(/Status/i)

        expect(skuInput).toBeInTheDocument()
        expect(comercialDescription).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(status).toBeInTheDocument()
    })
})

function renderComponent() {
    return render(
        <QueryClientProvider client={new QueryClient()}>
            <SkuRegisterPage />
        </QueryClientProvider>
    )
}