import { useRouter } from "next/router";
import { BsFillCheckCircleFill } from "react-icons/bs";
const Success = () => {
  const router = useRouter();
  return (
    <div className="bg-deafult h-screen">
      <main className="max-w-screen-xl mx-auto">
        <div className="flex flex-col p-10 bg-white rounded-md">
          <div className="flex items-center space-x-2 mb-5">
            <BsFillCheckCircleFill className="text-green-500 " fontSize={40} />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for your purchase! Your payment was successful and we
            appreciate your business. Your order will be processed and shipped
            shortly. If you want to check status of order(s) please press the
            link below
          </p>
          <button className="btn mt-8" onClick={() => router.push("/orders")}>
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
