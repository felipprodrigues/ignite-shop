import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId, line_items } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!priceId) {
    return res.status(400).json({ error: "Price not found." });
  }

  // Set the Stripe API key as the Authorization header
  const stripeApiKey = process.env.STRIPE_SECRET_KEY;
  const stripe = require("stripe")(stripeApiKey);

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: line_items.map((item: any) => ({
      price: item.priceId,
      quantity: 1,
      adjustable_quantity: {
        enabled: true,
        maximum: 5,
        minimum: 1,
      },
    })),
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession?.url,
  });
}
