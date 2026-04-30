import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://payment-integration-using-backend.onrender.com/success",
      },
    });

    if (result.error) {
      setMessage(result.error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay}>
      <input
        type="text"
        placeholder="Name"
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-[20px] p-[20px] w-[100%]"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckoutForm;
