import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

export const stripePromise = loadStripe(
  "pk_test_51KDXmWHaihyfLvOYdyAHhUbyIA2ja1YjTf80Vz5m6KISmulGVouqG3eXi6TMPfrOmeQSdpoteGlkCqzNonQCHyWy00AOWBIbDY"
);

const Payment = () => {
  const auctionId = useParams();
  const [clientSecret, setClientSecret] = useState("");


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            auctionId={auctionId}
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
