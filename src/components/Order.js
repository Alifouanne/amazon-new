import moment from "moment";
import Currency from "react-currency-formatter";
const Order = ({ id, amount, amountShipping, items, timestamp, images }) => {
  return (
    <div className="relative boreder rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600 rounded-md">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="GBP" /> - Next Day Delivary{" "}
            <Currency quantity={amountShipping} currency="GBP" />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl  flex-1 text-right text-blue-500">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs ">
          ORDER # {id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="product"
              className="h-20 object-contain sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
