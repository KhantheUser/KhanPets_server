const stripe = require("stripe")(
  "sk_test_51MmsiUEfstQTleRLPgSmG8D87YYsm7HVRN8D9DPMWNlXIyRZZ4ZbgDO81Xvmm6SKu5EpMVI9lZ2YLIUCxrE4ljzr00A9h4h4pD"
);
const TinyURL = require("tinyurl");
const express = require("express");
const routes = express.Router();
routes.route("/").post(async (req, res) => {
  const { carts, user } = req.body;

  const products = carts.map((cart, index) => {
    return {
      price_data: {
        currency: "usd",
        unit_amount: cart.product.price,
        product_data: {
          name: cart.product.name,
          description: cart.product.desc,
          images: [cart.product.img[0]],
        },
      },

      quantity: 1,
    };
  });
  const customers = await stripe.customers.list();

  const valid = customers.data.find((item) => item.email === user.email);

  let customer;
  if (valid) {
    customer = {
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  } else {
    customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }

  const promises = carts.map(async (cart, index) => {
    let url;
    try {
      url = await TinyURL.shorten(cart.product.img[0]);
      console.log(url);
      if (url === "Error") {
        url = "https://bom.so/tmYGBH";
      }
    } catch (e) {
      url = "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg";
    }
    return {
      name: index.toString(),
      value: url,
    };
  });
  const results = await Promise.all(promises);

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    invoice_creation: {
      enabled: true,
      invoice_data: {
        custom_fields: results,
      },
    },
    shipping_address_collection: {
      allowed_countries: ["US", "VN"],
    },
    line_items: products,
    mode: "payment",
    success_url: `khan-pets-client.vercel.app/checkout/success`,
    cancel_url: `https://www.invert.vn/media/uploads/uploads/2022/12/03191304-8-anh-gai-xinh-toc-dai.jpeg`,
  });

  res.status(200).json({
    status: "success",
    data: session,
    user: customer,
  });
});

module.exports = routes;
routes.route("/invoice").get(async (req, res, next) => {
  const charges = await stripe.invoices.list();
  res.status(200).json({
    status: "success",
    data: charges,
  });
});
module.exports = routes;
