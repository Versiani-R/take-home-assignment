import { HandleQuote } from "domain/interfaces/use-cases";
import Database from "domain/interfaces/database";
import InMemoryDatabase from "infrastructure/repositories/database/in-memory-database";
import AIRepository from "domain/interfaces/AI";
import AI from "infrastructure/repositories/services/AI";

export default class QuoteHandlingSync implements HandleQuote {
    private databaseRepository: Database
    private AIServiceRepository: AIRepository

    constructor(
        databaseRepository?: Database,
        AIServiceRepository?: AIRepository,
    ) {
        this.databaseRepository = databaseRepository ?? new InMemoryDatabase()
        this.AIServiceRepository = AIServiceRepository ?? new AI()
    }

    execute = async (body: string) => {
        try {
            const prices = JSON.stringify(await this.databaseRepository.getAll())
            return this.AIServiceRepository.identifyQuote(body, prices)
        } catch (error) {
        }
    };
}