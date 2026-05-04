const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY =
  "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRFMk1ERXhNeXdpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS52Yi1FcGZmeEl6dldjcEhTaUpLbWF2UC1WNzVCZjVFRGZnTGJ6YmdzYTZVTWNmZkhPbHdOUXFVSlhDZkVuQVZUTFBDTnoyRE43WXcwRmQ5LXloRUFLZw==";
const INTEGRATION_ID = 5650050;
const IFRAME_ID = 1040106;

app.post("/pay", async (req, res) => {
  try {
    const { amount } = req.body;

    // 1. auth token
    const authRes = await axios.post(
      "https://accept.paymob.com/api/auth/tokens",
      { api_key: API_KEY },
    );
    const token = authRes.data.token;

    // 2. create order
    const orderRes = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: token,
        delivery_needed: false,
        amount_cents: amount * 100,
        currency: "EGP",
        items: [],
      },
    );

    const orderId = orderRes.data.id;

    // 3. payment key
    const paymentKeyRes = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        auth_token: token,
        amount_cents: amount * 100,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: "NA",
          email: "test@test.com",
          floor: "NA",
          first_name: "Omar",
          street: "NA",
          building: "NA",
          phone_number: "01000000000",
          shipping_method: "NA",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          last_name: "Test",
          state: "Cairo",
        },
        currency: "EGP",
        integration_id: INTEGRATION_ID,
      },
    );

    const paymentKey = paymentKeyRes.data.token;

    // 4. iframe url
    const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentKey}`;

    res.json({ paymentUrl });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("Server running on 3000"));
