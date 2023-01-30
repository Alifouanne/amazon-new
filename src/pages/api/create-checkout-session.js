const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  const { items, email } = req.body;
  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "gbp",
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
      unit_amount: item.price * 100,
    },

    quantity: 1,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate: "shr_1MQHeKCJxdfHa44PVd7NX6Sr",
      },
    ],

    shipping_address_collection: {
      allowed_countries: ["US", "GB", "CA"],
    },
    mode: "payment",
    line_items: transformedItems,
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  res.status(200).json({ id: session.id });
}
