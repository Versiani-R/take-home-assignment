import Database from "domain/interfaces/database";

let instance: InMemoryProductsDatabase
export default class InMemoryProductsDatabase implements Database {

    static getInstance = () => {
        if (!instance) {
            instance = new InMemoryProductsDatabase()
        }

        return instance
    }

    private readonly data = {
        'x001-001-001': {
            amountInStore: 50,
            dimensions: '5m x 2m',
            weightPerUnityInKg: 1,
            pricePerUnit: 10
        },
        'x002-002-002': {
            amountInStore: 10,
            dimensions: '1m x 1m x 1m',
            weightPerUnityInKg: 0.43,
            pricePerUnit: 15
        },
        'y000-000-001': {
            amountInStore: 10,
            dimensions: '1l',
            weightPerUnityInKg: 0.99,
            pricePerUnit: 20
        },
        'z000-000-001': {
            amountInStore: 10,
            dimensions: '5m',
            weightPerUnityInKg: 40,
            pricePerUnit: 25
        },
    }

    getById = async (id: string) => {
        return Promise.resolve(this.data[id])
    }

    getAll = async () => {
        return Promise.resolve(this.data)
    }
}