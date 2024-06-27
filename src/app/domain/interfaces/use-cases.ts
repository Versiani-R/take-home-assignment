interface UseCase {
    execute: (...args: unknown[]) => Promise<unknown>
}

interface HandleQuote extends UseCase {
    execute: (body: string) => Promise<string>
}

export type { HandleQuote }