import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Currency from "react-currency-formatter";
import useStore from "../app/ZustandStore";
import { CheckoutProduct, Header } from "../components";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const Checkout = () => {
  const store = useStore();
  const total = store.items.reduce((total, item) => total + item.price, 0);
  const { data: session } = useSession();
  const items = useStore((state) => state.items);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    //create checkout session with stripe
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });
    //redirect customer to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error.message);
  };
  return (
    <div className="bg-deafult">
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* left section */}
        <div>
          <Image
            src="/ad-1.png"
            width={1020}
            height={250}
            className="object-contain grow m-5 shadow-sm rounded-md"
            alt="ad-1"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white rounded-md">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>

            {items.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                rate={item.rate}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* right section */}
        <div className="flex flex-col bg-white p-10 shadow-md rounded-md ">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length}) items :{""}
                <span className="font-bold">
                  <Currency quantity={total} currency="GBP" />
                </span>
              </h2>
              <button
                className={`btn mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
                disabled={!session}
                role="link"
                onClick={createCheckoutSession}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
