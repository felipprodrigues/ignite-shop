This README provides an overview of the technologies and libraries used in this project stack, as well as important considerations for integrating with Stripe.

## Getting Started
First, clone the repo

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Project Stack and Stripe Integration

## Project Stack

Our project utilizes a carefully selected stack of technologies and libraries to ensure the development of a robust web application. This stack is designed to offer security, efficiency, and a user-friendly experience. Here are the key components of our stack:

- **@stitches/react** (Version 1.2.8): A CSS-in-JS library for styling React components.
- **axios** (Version 1.4.0): A promise-based HTTP client for making API requests.
- **keen-slider** (Version 6.8.6): A responsive touch slider library for creating interactive components.
- **next** (Version 13.4.12): A React framework for building server-rendered web applications.
- **phosphor-react** (Version 1.4.1): A set of high-quality icons as React components.
- **react-toastify** (Version 9.1.3): A library for displaying toast notifications in React applications.
- **stripe** (Version 12.17.0): An integration with Stripe, a payment processing platform.
- **typescript** (Version 5.1.6): A strongly-typed superset of JavaScript for enhanced code reliability.

## Stripe Integration

This application is integrated with Stripe for secure payment processing. It's important to note that when working with Stripe, there are two modes: **development** and **live mode**.

- **Development Mode**: During development, we use Stripe's development keys. These keys are safe to use for testing and development purposes. You can find more information on Stripe's development keys [here](https://stripe.com/docs/keys). Please be aware that while development mode works locally, it will not function in the production environment.

- **Live Mode**: In the live environment, we use Stripe's live keys. It is crucial to keep these keys confidential and never expose them in your codebase or publicly. Revealing live keys can lead to sensitive user data exposure and potential security risks.

Ensure that you switch between development and live modes appropriately in your Stripe integration to maintain the security and privacy of user data when transitioning from development to production environments.

Feel free to refer to Stripe's documentation for more details on handling keys and securely integrating Stripe into your application.
