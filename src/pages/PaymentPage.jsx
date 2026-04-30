import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPayment = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/pay/create_payment",
          {
            amount: 500,
          },
        );

        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    createPayment();
  }, []);

  return (
    <div className="w-[400px] m-auto mt-[50px]">
      <h2>Buy JavaScript Course</h2>

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
