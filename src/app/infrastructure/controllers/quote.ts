import { Request, Response, NextFunction, Router } from "express";

import Controller from "domain/interfaces/controller";

/* Use Cases */
import QuoteHandlingSync from "domain/use-cases/quote-handling";
import GetQuotesSync from "domain/use-cases/get-quotes";


export default class QuoteController implements Controller {
    private router: Router = Router()
    public getRouter = () => this.router

    private quoteHandlingSync: QuoteHandlingSync
    private getQuotesSync: GetQuotesSync

    constructor(quoteHandlingSync?: QuoteHandlingSync, getQuotesSync?: GetQuotesSync) {
        this.quoteHandlingSync = quoteHandlingSync ?? new QuoteHandlingSync()
        this.getQuotesSync = getQuotesSync ?? new GetQuotesSync()

        this.initializeRoutes()
    }

    public initializeRoutes = () => {
        this.router.post('/quote', this.handleQuote.bind(this))
        this.router.get('/quotes', this.getQuotes.bind(this))
    }

    private handleQuote = async (request: Request, response: Response, next: NextFunction) => {
        const email: Record<string, string> = request.body

        const quote = await this.quoteHandlingSync.execute(email.body)
        response.json(quote)
    }

    private getQuotes = async (request: Request, response: Response, next: NextFunction) => {
        return response.json(await this.getQuotesSync.execute())
    }
}