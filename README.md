# E-Commerce App README

This README provides an overview of the app's functionality and key features.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Usage](#usage)
4. [Installation](#installation)
5. [Development Mode](#development-mode)
6. [Stripe Integration](#stripe-integration)
7. [Success Page](#success-page)
8. [Contributing](#contributing)

## Introduction

This E-Commerce App is designed to provide users with a seamless online shopping experience. It encompasses various features to facilitate browsing, selecting products, and completing purchases. Here's a brief overview of the core functionalities:

## Features

### 1. Landing Page
- The landing page displays a list of products available for purchase.
- Users can easily filter products based on their tags.
- Products can be added directly to the shopping cart for a quick shopping experience.

### 2. Product Page (ID Page)
- Each product has a dedicated page where users can view detailed information.
- Users can access this page by clicking on a product from the landing page.
- This page provides comprehensive information about the selected product.

### 3. Sidepanel Checkout
- As users add items to their cart, a side panel dynamically updates to show the list of items in the cart.
- Users can review the items in their cart at any time without leaving the current page.
- This provides a convenient way to keep track of selected items before proceeding to checkout.

### 4. Checkout (Development Mode)
- The checkout process is streamlined, allowing users to finalize their purchases.
- **Important Note:** The checkout process only works in development mode due to Stripe integration using development mode keys. More on this in the [Development Mode](https://stripe.com/docs/keys) section.
- Users can review their order, adjust order quantity, and proceed to payment.

### 5. Success Page
- After successfully completing the payment process via Stripe, users are redirected to a success page.
- The success page confirms the successful purchase and provides a seamless transition back to the application.

## Usage

To use our E-Commerce App, follow these steps:

1. Visit the landing page to browse and select products.
2. Click on a product to view its dedicated page for more information.
3. Use the side panel to review and manage items in your shopping cart.
4. When ready, proceed to checkout (Note: In development mode).
5. Complete the payment process securely using Stripe.
6. Upon successful payment, you will be redirected to the success page.

## Installation

To install and run the app locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install` or `yarn install`.
3. Start the development server using `npm start` or `yarn start`.

## Development Mode

Our E-Commerce App operates in development mode, allowing you to test and develop without real financial transactions taking place. The Stripe integration uses development mode keys for this purpose.

# Stripe Integration

This application is integrated with Stripe for secure payment processing. It's important to note that when working with Stripe, there are two modes: development and live mode.

- **Development Mode**: During development, we use Stripe's development keys. These keys are safe to use for testing and development purposes. You can find more information on Stripe's development keys [here](https://stripe.com/docs/keys). Please be aware that while development mode works locally, it will not function in the production environment.

- **Live Mode**: In the live environment, we use Stripe's live keys. It is crucial to keep these keys confidential and never expose them in your codebase or publicly. Revealing live keys can lead to sensitive user data exposure and potential security risks.

Ensure that you switch between development and live modes appropriately in your Stripe integration to maintain the security and privacy of user data when transitioning from development to production environments.

Feel free to refer to Stripe's documentation for more details on handling keys and securely integrating Stripe into your application.
