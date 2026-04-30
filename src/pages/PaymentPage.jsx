import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51TGyn4EoUfTQXtUdA6uNjn5F1vd8iQOEyh0H6JTptB2SPyV60hO0eI8ln8ggFkJxTzzDu1qmTKFZuFRwjvfhws3k00YbnpcvnZ"d);

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPayment = async () => {
      try {
        const res = await axios.post(
          "https://payment-integration-using-backend.onrender.com/pay/create_payment",
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
