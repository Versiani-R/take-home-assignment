export default interface AIRepository {
    identifyQuote: (body: string, prices: string) => Promise<string>
}