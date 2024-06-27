import OpenAI from "openai"
import AIRepository from "domain/interfaces/AI"

export default class AI implements AIRepository {
    private client: OpenAI

    constructor() {
        this.connect()
    }

    private connect = () => {
        this.client = new OpenAI({
            apiKey: process.env.API_KEY,
        })
    }

    public identifyQuote = async (body: string, prices: string) => {
        const stream = await this.client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Determine if the following email is a request for quote or not. Assuming the email is a request for quote, extract the customer, products and quantities being requested, along with any other relevant information like custom dimensions or processing, due dates, shipping restrictions, etc. Given this structured information from the request for quote, search the existing inventory to determine if the order can be fulfilled from products that are already in stock. If the order can either be fully or partially filled with existing stock, determine a reasonable sales price for the product. \n\nEmail: ${body}\n\nInventory: ${prices}`
                }
            ],
        })

        return stream.choices[0].message.content
    }
}