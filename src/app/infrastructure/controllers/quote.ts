import { Request, Response, NextFunction, Router } from "express";
import Controller from "domain/interfaces/controller";
import QuoteHandlingSync from "domain/use-cases/quote-handling";

export default class QuoteController implements Controller {
    private router: Router = Router()
    public getRouter = () => this.router

    private quoteHandlingSync: QuoteHandlingSync

    constructor(quoteHandlingSync?: QuoteHandlingSync) {
        this.quoteHandlingSync = quoteHandlingSync ?? new QuoteHandlingSync()

        this.initializeRoutes()
    }

    public initializeRoutes = () => {
        this.router.post('/quote', this.handleQuote.bind(this))
    }

    private handleQuote = async (request: Request, response: Response, next: NextFunction) => {
        /* TODO: Create a type for this */
        const email = request.body

        const quote = await this.quoteHandlingSync.execute(email.body)
        response.json(quote)
    }
}