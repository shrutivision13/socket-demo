import React, { useEffect, useState } from "react";
import { AcceptHosted, HostedForm } from "react-acceptjs";
import { socket } from "../../socketConfig";
import { toast } from "react-toastify";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import StripeCheckout from "../stripeCheckout";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY ||
    "pk_test_51OvbPGIkYBbcGFTmiUqWapN7sJ2X6VcQSis5Knxo2hcm7lOKGqRBpVbrgGCMzG8rDjThBOfeIqAdqPzfFiiXELTp00WhOm93Pf"
);

const Payment = ({ amount, cartProduct, buttonStyle, setCartProduct }) => {
  const [paymentDetails, setPaymentDetails] = useState();

  const [submit, setSubmit] = useState(false);
  console.log("🚀 ~ Payment ~ submit:", submit);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (submit) {
      socket.emit("client:addPayment", {
        ...paymentDetails,
        product: { amount, cart_id: cartProduct?._id },
      });
      socket.on("server:addPayment", (data) => {
        if (data?.status === 200) {
          handleResponse();
          setCartProduct();
        } else {
          handleErrorResponse(data?.error || "Something went wrong");
        }
        socket.off("server:addPayment");
        setSubmit(false);
      });
    }
  }, [submit]);

  const paymentIntent = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  const handleResponse = (message) => {
    navigate(`/user/success/${cartProduct?._id}`);
    setCartProduct();
  };

  const handleErrorResponse = (message) => {
    navigate(`/user/fail`);
    toast.error(message);
  };
  console.log("🚀 ~ Payment ~ paymentIntent:", paymentIntent);

  useEffect(() => {
    if (paymentIntent) {
      setClientSecret(paymentIntent);
    }
  }, [paymentIntent]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
  }, []);

  console.log("🚀 ~ Payment ~ amount:", amount);
  const handleSubmit = (response, amount) => {
    setPaymentDetails(response);
    setSubmit(true);

    console.log("Received response:", response);
  };

  const authData = {
    apiLoginID: process.env.REACT_APP_AUTHORIZED_LOGIN_ID,
    clientKey: process.env.REACT_APP_AUTHORIZED_CLIENTKEY,
  };
  console.log("🚀 ~ Payment ~ authData:", authData);

  const createOrderApi = () => {
    return new Promise((resolve, reject) => {
      socket.emit("client:createpaypalorder", { amount });

      socket.on("server:createpaypalorder", (data) => {
        console.log("Connected to server");
        resolve(data?.jsonResponse?.id);
      });
    });
  };

  async function createOrder() {
    const data = await createOrderApi();
    console.log("🚀 ~ createOrder ~ data:", data);
    return data;
  }
  function onApprove(data) {
    console.log("🚀 ~ onApprove ~ data:", data);
    socket.emit("client:captureorder", {
      orderID: data?.orderID,
      cart_id: cartProduct?._id,
    });

    socket.on("server:captureorder", (data) => {
      console.log("Connected to server", data);
      if (data?.httpStatusCode === 201) {
        handleResponse();
      } else {
        handleErrorResponse(data?.error || "Something went wrong");
      }
      // resolve(data?.jsonResponse?.id);
    });
  }

  const createStripePaymentIntent = () => {
    socket.emit(
      "client:createstripepaymentintent",
      cartProduct?.product_id?.map((product) => ({
        price: product?.quantity * product?.product?.price,
        quantity: product?.quantity,
      })),
      amount
    );

    socket.on("server:createstripepaymentintent", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      setClientSecret(data?.clientSecret);
      console.log("Connected to server");
      // resolve(data?.jsonResponse?.id);
    });
  };
  console.log(
    "🚀 ~ Payment ~ process.env.REACT_APP_PAYPAL_CLIENT_ID:",
    process.env.REACT_APP_PAYPAL_CLIENT_ID
  );

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        }}
      >
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
      <HostedForm
        authData={authData}
        buttonStyle={buttonStyle}
        onSubmit={(data) => handleSubmit(data, amount)}
      />
      <button
        onClick={createStripePaymentIntent}
        className="text-base bg-indigo-500 mt-2 bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  bg-blue-700 rounded-lg leading-none w-full py-3 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
      >
        Pay with stripe
      </button>

      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
        >
          <StripeCheckout
            setCartProduct={setCartProduct}
            cartProduct={cartProduct}
            navigate={navigate}
          />
        </Elements>
      )}
    </>
    // <AcceptHosted
    //   formToken={
    //     "Q6+qEIl8jvoF239klxuq2irx2i5cC129z985gL6X2hg4oPjheV+l01llwQvjZ6wosOKB2cu+1KmyxfkX5lDTmmwBjmA9HqXWh5Yx2Ess+/nK2rPll3GHlLvjvjx5Z3cyGHryBSrZtE/Baj2W+hzdIm+U1F803uhDHTu6/GdT5ibGEcpdG3BLO3dM+2HaoUVzfLZMZVKox8sRZ65cv0CDmCQ3ilvWM0aUTNORRgIB3fmghScCqvSsejABlD1exY+sn0+L0C3+cjSx7CuXKz+4/bPvmVktapXW6neYlhUq0BOTkJQaxxx8SK+wffvkI1diMqZsjWw6cE2oHVOwb7GoEYPGGgc62oCvoaA98ZmCF9W1a08Zoy1+sHAaoT5nMkNoO5o77CbEo3IhFtFWmLuX3S+ACDTlQidzvL81kjvo803lXUzawougPCw9SNhVP2wo8rtjglffsQgik7+exy4Ez7w/UPV1dSDLLgIITnpxRFEdBExfmoNlvlT67YoQ1bMAxDZRJS7FVqeoU1bTmiXwXkWrJJnL38cgGgk5ouZ02t2VMVfJTFNQObg727VukEs2hQv8AzzUqXqtCc79de82UVe7RgMRPLDjp3M2SzcdZR7RUhIRlIrQCFZs4dBIFOpNJgY15iwbFCtAqjK1ZFV7OFdsvMORXfBhTtnACOjVp6AsDUMJ2nhm8hECo63Ro7ixDFuWBUfgf+4wqkzV+IakXz1MBCvh7tD7jz7UWKIqnIzok/TDPAfmqMPmKBVynBTmcDHAeq5XJUVl2mOGBHWC6FC3ATsJK4JkEHbkH+sspmD3KFvraIUeiRvZ2o1GvmHai40HCs5bjjDGJKYT4KCkoKZa9MgRJQBycCQ+MQ02sUDwFPBS0WqgktslOjSiJJunsv8T+x5poFYLDJx+bfWolpoT0rvY76vA4urDiCpgY/3XQ/tLs5hnCSjKRNFT25nJBS+jt0c5pcqJC5uV9m6bk4jv4CRm/uwMDTaaVeAEbGT5Bm4rSeXHNch5QJtI/amth/uGEWN94pM5OWLzlvRjfZS8JFKhXhDh4fL92iaAa3ulhn/Lgn0vP5+VpwOiTmb1IfhcyvXtWqitES0Xy24xcg==.8JQ9VSHs7z68"
    //   }
    //   onSuccessfulSave={(data) => {
    //     console.log(data);
    //   }}
    //   onCancel={(err) => {
    //     console.log("Cancelled");
    //   }}
    //   onTransactionResponse={(data) => {
    //     console.log("17", data);
    //   }}
    //   integration="redirect"
    // >
    //   Continue to Redirect
    // </AcceptHosted>
    // <AcceptHosted
    //   formToken={
    //     "7RwbgPaGbUGu6iZ/Rhaju2MXi4KjPE+nUfMU6MMbmpV3MRCn1ORVc9tJYruhwGjrbJC474OO3Gjtycm+krh9UygzLlgGu6M1bHGldSx7OyTMkJaUxLTGQxlxpm1sk98UbQdk9yhHuaVbXKdoQUHg9OBoCMgEgDy1Z/YEXwmBj4yKsp3MiblgAP5jjUEPj1bqepfXj7pk7y3jQKIPKqtWgmsPsnWIDKb8RbJYZHJSv0499PI4veg7iHwkrT8Iv9+cznjFUKOXOKRs3VdWM5VL4LFNsei+4Zd1vdYi7x/iEI1w9GUtyMRwi+L+5nHrqxPz0IHnEYMrZbBWLPXAlfw0iYxg5Oid0OC7IIPa9w376VBrEP87Slce+z0dv2OmQPiUeSq3KVz8ah10kV6VygvsdVGolQYUalzjRJRMbbnC79t/ItW1RnJjX1phWkmKF/ml/1qTNwbApdDK2K7Skx2W3g6LSoFYPX24l64gBW6kX3pfumVrtX8Ja2Y7Ow/Ua0GgcjVA2hGRULxoRSDCBBq5JIuKEmjdGWqYhxDfpfgfqKLiiUUbw1YXBd56WW89rMuY8bHjyWZxkea7KbGIpQGpx6ruG1n60HSaYih6Iz5Bu2sg+w7rdWPRdtGxKFfenmX/+XHoX/5nmgQtPAvJ+6cMEqGJNw2W5wg+2GL6DmOM/dU70U+xGQzt12qJ8wznQoOs/khx7+mR16dyfWl3eXbQdfvULh88CuPwJmB+TLKV8Z35TaGrB/qZ+9+3NT4gqX45XQNIy+9BkdXGZIADDRTXe4Jo3m8ThXxyxj0RkUG/tnerFgQLR3CI6YMlw/8gjDubgSeaJYBEQTlcXbpvjgzPo/baBedAgX8nhX92BiGbEf4g73X6vd4LywLDhmT88G9D0ANaUhVFDrBJT1b9iIeFpFDd69uifLvn2juqQIfw5NpFRzjNSTX2kh131DwQ7/7qblpllyPEDHetur5tk07D27waLMKh6VELjTrdXEtz0GmpUt4wQnU55jSRkBZw5c0fsYiUevdhVd/vwquTMkdcKXPUG++63jV6ApUm82qBHhli1Wd8LVaP20ZF0rOO19wQJmQi1xhfwqDhxl1u8wYAsQ==.8JQ9VSHs7z68"
    //   }
    //   onSuccessfulSave={(data) => {
    //     console.log(data);
    //   }}
    //   onCancel={(err) => {
    //     console.log("Cancelled");
    //   }}
    //   integration="iframe"
    //   onTransactionResponse={(response) => {
    //     console.log("🚀 ~ Payment ~ response:", response);

    //     // setResponse(JSON.stringify(response, null, 2) + "\n");
    //   }}
    // >
    //   <AcceptHosted.Button className="btn btn-primary">
    //     Continue to IFrame
    //   </AcceptHosted.Button>
    //   <AcceptHosted.IFrameBackdrop />
    //   <AcceptHosted.IFrameContainer>
    //     <AcceptHosted.IFrame />
    //   </AcceptHosted.IFrameContainer>
    // </AcceptHosted>
  );
};

export default Payment;
