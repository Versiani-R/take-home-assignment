# Automated RFQ Processing System

## Overview

This project implements an automated system for processing customer emailed requests for quotes (RFQs) in a metal service center. The system leverages AI tools to:
1. Identify if an email is an RFQ.
2. Extract relevant details from the RFQ such as customer information, products, quantities, and any special requirements.
3. Check inventory to determine if the order can be fulfilled with existing stock and calculate a reasonable sales price.
4. Generate structured quotes and provide a UI for salespeople to view, finalize, and send the quotes to customers.

## Architecture and Design

The system is designed with a modular architecture, comprising the following key components:

- **Controllers**: Handle incoming requests and route them to appropriate use cases.
- **Use Cases**: Implement the core business logic for handling quotes and retrieving quotes.
- **Repositories**: Provide data access to the in-memory databases for products and quotes.
- **Services**: Integrate with external AI services for processing emails and generating quotes.

## Simplified Project Structure

```
src/
│
├── app/
│   ├── infrastructure/
│   │   ├── controllers/
│   │   │   └── quote.ts
│   │   ├── repositories/
│   │   │   ├── database/
│   │   │   │   ├── in-memory-products-database.ts
│   │   │   │   └── in-memory-quotes-database.ts
│   │   │   └── services/
│   │   │       └── AI.ts
│   ├── domain/
│   │   ├── use-cases/
│   │   │   ├── get-quotes.ts
│   │   │   └── quote-handling.ts
│   │   └── interfaces/
│   │       ├── controller.ts
│   │       ├── use-cases.ts
│   │       └── database.ts
│   └── main.ts
│
└── README.md
```

## Entry Points

### API Endpoints

- **POST /quote**: Determine if an email is a RFQ and if so, process it and generate a quote.
- **GET /quotes**: Retrieve all generated quotes.

### Main Application

- **src/app/main.ts**: Entry point for the application, initializes the Express server, routes and middlewares.

## Setup and Running the Project

### Prerequisites

- Node.js (>=20.x.x)
- npm (>=10.x.x)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Versiani-R/take-home-assignment rfq-processing-system
    cd rfq-processing-system
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    ```sh
    cp .env.example .env
    ```
   Edit the `.env` file to include your OpenAI API key:
    ```
    API_KEY=your_openai_api_key
    ```

### Running the Application

1. Start the server:
    ```sh
    npm run dev
    ```

2. The application will be accessible at `http://localhost:8080`.

### Usage

- **Process an RFQ email**:
  Send a POST request to `http://localhost:8080/v1/quote` with the email content in the request body as a raw json format:
  ```json
  {
    "body": "Hi, I'm customer #001 Renato Versiani. I want a quote for the product y000-000-001, I want 5 liters. I'm also interested in the product z000-000-001, can you fold the 5m sheets into 2.5m ? Because my truck bed would not fit 5 meters"
  }
  ```

- **Retrieve all quotes**:
  Send a GET request to `http://localhost:8080/v1/quotes`.

## Engineering Specification

### General Approach

- **Identification and Extraction**: Utilizes OpenAI's GPT-3.5-turbo model to identify RFQs and extract relevant details.
- **Inventory Check and Pricing**: Checks in-memory product database to fulfill the order and calculate pricing.
- **Quote Generation**: Generates structured quotes and saves them in an in-memory database.
- **User Interface**: Provides endpoints for salespeople to view and finalize quotes.

### Design Choices

- **Modular Architecture**: Ensures separation of concerns and makes the system scalable and maintainable.
- **In-Memory Databases**: Used for simplicity and speed during the development and testing phase.
- **AI Integration**: Leverages GPT-3.5-turbo for its advanced natural language processing capabilities.

### Assumptions and Trade-offs

- **In-Memory Storage**: Chosen for simplicity; a real-world application would use persistent storage.
- **AI Model Choice**: GPT-3.5-turbo is used for its balance of cost and performance; more specialized models could be considered for production.

## Conclusion

This project demonstrates a practical implementation of an automated RFQ processing system using modern AI tools and best practices in software architecture. It provides a foundation for further development and scaling in a production environment.
