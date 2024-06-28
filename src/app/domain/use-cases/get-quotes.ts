import { GetQuotes } from "domain/interfaces/use-cases";
import Database from "domain/interfaces/database";

/* Repositories */
import InMemoryQuotesDatabase from "infrastructure/repositories/database/in-memory-quotes-database";


export default class GetQuotesSync implements GetQuotes {
    private quotesDatabase: Database

    constructor(
        quotesDatabase?: Database,
    ) {
        this.quotesDatabase = quotesDatabase ?? InMemoryQuotesDatabase.getInstance()
    }

    execute = async () => {
        try {
            const quotes = await this.quotesDatabase.getAll() as unknown[]
            return quotes
        } catch (error) {
            return []
        }
    };
}