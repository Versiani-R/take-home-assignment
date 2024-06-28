interface UseCase {
    execute: (...args: unknown[]) => Promise<unknown>
}

interface HandleQuote extends UseCase {
    execute: (body: string) => Promise<string>
}
interface GetQuotes extends UseCase {
    execute: () => Promise<unknown[]>
}

export type { HandleQuote, GetQuotes }