import Database from "domain/interfaces/database";

let instance: InMemoryQuotesDatabase
export default class InMemoryQuotesDatabase implements Database {
    private readonly data = []

    static getInstance = () => {
        if (!instance) {
            instance = new InMemoryQuotesDatabase()
        }

        return instance
    }

    save = async (quote: string, analysis: string) => {
        Promise.resolve(this.data.push({ quote, analysis }))
    }

    getAll = (): Promise<unknown[]> => {
        return Promise.resolve(this.data)
    }
}