import { CreateSkuUseCase } from "../../application/usecases/create-sku/create-sku";
import { DuplicatedValueException } from "../../domain/errors/DuplicatedValue";
import { ILogger } from "../../domain/interfaces/ILogger";
import { ISkuRepository } from "../../domain/repositories/skuRepositoryInterface";



describe("CreateSkuUseCase", () => {
    const mockSkuRepository: jest.Mocked<ISkuRepository> = {
        findBySku: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),       
        getPage: jest.fn(),        
        update: jest.fn(),         
        updateStatus: jest.fn(),   
    };

    const mockLogger: jest.Mocked<ILogger> = {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        debug: jest.fn(),
    };

    const useCase = new CreateSkuUseCase(mockSkuRepository, mockLogger);

    const descricaoComercial = "Produto Teste";
    const sku = "ABC123";
    const descricao = "Descrição do produto";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve criar um SKU com sucesso quando não existir duplicidade", async () => {
        mockSkuRepository.findBySku.mockResolvedValue(null);

        await useCase.execute(descricaoComercial, sku, descricao);

        expect(mockLogger.info).toHaveBeenCalledWith(`Iniciando criação de SKU: ${sku}`);
        expect(mockSkuRepository.findBySku).toHaveBeenCalledWith(sku);
        expect(mockSkuRepository.create).toHaveBeenCalledWith(descricaoComercial, sku, descricao);
        expect(mockLogger.info).toHaveBeenCalledWith(`SKU ${sku} criado com sucesso.`);
    });
});
