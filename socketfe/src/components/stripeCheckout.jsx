import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { socket } from "../socketConfig";

const StripeCheckout = ({ setCartProduct, cartProduct }) => {
  const stripe = useStripe();
  const elements = useElements();
  console.log("🚀 ~ StripeCheckout ~ elements:", elements);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
  useEffect(() => {
    console.log("🚀 ~ StripeCheckout ~ clientSecret:", clientSecret);
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log(
        "🚀 ~ stripe.retrievePaymentIntent ~ paymentIntent:",
        paymentIntent
      );

      switch (paymentIntent.status) {
        case "succeeded": {
          console.log(
            "🚀 ~ stripe.retrievePaymentIntent ~ cartProduct?._id:",
            cartProduct?._id
          );

          socket.emit("client:updatecart", cartProduct?._id, {
            transactionId: paymentIntent?.id,
            networkTransId: paymentIntent?.client_secret,
            status: "Ordered",
            transactionStatus: "Success",
            platform: "stripe",
          });
          socket.on("server:updatecart", (data) => {
            console.log("🚀 ~ socket.on ~ data:", data);
            if (data?.status === 200) {
              setCartProduct();
              toast.success("Payment succeeded!");
            }
          });
          break;
        }
        case "processing":
          toast("Your payment is processing.");
          break;
        case "requires_payment_method":
          toast("Your payment was not successful, please try again.");
          break;
        default:
          toast.error("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    debugger;
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/user/cart",
      },
    });
    debugger;
    console.log("🚀 ~ handleSubmit ~ error:", error);

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };
  return (
    !clientSecret && (
      <div className="mt-2">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          onClick={handleSubmit}
          className="text-base mt-2 bg-indigo-500 bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  bg-blue-700 rounded-lg leading-none w-full py-3 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
        >
          Pay
        </button>

        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </div>
    )
  );
};

export default StripeCheckout;
