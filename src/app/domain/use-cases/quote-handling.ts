import { HandleQuote } from "domain/interfaces/use-cases";
import AIRepository from "domain/interfaces/AI";
import Database from "domain/interfaces/database";

/* Services */
import AI from "infrastructure/repositories/services/AI";

/* Repositories */
import InMemoryProductsDatabase from "infrastructure/repositories/database/in-memory-products-database";
import InMemoryQuotesDatabase from "infrastructure/repositories/database/in-memory-quotes-database";


export default class QuoteHandlingSync implements HandleQuote {
    private productsDatabase: Database
    private quotesDatabase: Database
    private AIServiceRepository: AIRepository

    constructor(
        productsDatabase?: Database,
        quotesDatabase?: Database,
        AIServiceRepository?: AIRepository,
    ) {
        this.productsDatabase = productsDatabase ?? InMemoryProductsDatabase.getInstance()
        this.quotesDatabase = quotesDatabase ?? InMemoryQuotesDatabase.getInstance()
        this.AIServiceRepository = AIServiceRepository ?? new AI()
    }

    execute = async (body: string) => {
        try {
            const prices = JSON.stringify(await this.productsDatabase.getAll())
            const analysis = await this.AIServiceRepository.identifyQuote(body, prices)
            await this.quotesDatabase.save(body, analysis)

            return analysis
        } catch (error) {
            return 'Unable to conclude analysis for quote.'
        }
    };
}