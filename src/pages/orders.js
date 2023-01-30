import moment from "moment/moment";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import db from "../../firebase";
import { Header, Order } from "../components";
import { authOptions } from "../pages/api/auth/[...nextauth]";
function Orders({ orders }) {
  const { data: session } = useSession();

  return (
    <div className="bg-deafult ">
      <Header />
      <main className="max-w-screen-xl mx-auto p-10 bg-white rounded-md">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, images, timestamp }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                images={images}
                timestamp={timestamp}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  //get the users logged in credentials
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      props: {},
    };
  }
  // firebase db orders
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();
  //stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(), //transform timestamp to unix timestamp
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
    },
  };
}
