import { Router } from "express";
import QuoteController from "infrastructure/controllers/quote";
import Controller from "domain/interfaces/controller";

const routes = Router();
const controllers: Controller[] = [new QuoteController()]

/* Goes through every controller adding the v1/ flag + all endpoints */
controllers.forEach(controller => {
    routes.use('/v1/', controller.getRouter())
})

export { routes };