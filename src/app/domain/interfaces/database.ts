export default interface Database {
    getById: (id: string) => Promise<string>
    getAll: () => Promise<Record<string, unknown>>
}