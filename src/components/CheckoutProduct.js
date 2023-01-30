import Image from "next/image";
import Currency from "react-currency-formatter";
import { HiStar } from "react-icons/hi";
import useStore from "../app/ZustandStore";
const CheckoutProduct = ({
  id,
  title,
  price,
  rate,
  description,
  category,
  image,
  hasPrime,
}) => {
  const rating = parseInt(rate, 10);
  const addToBasket = useStore((state) => state.addToBasket);
  const removeFromBasket = useStore((state) => state.removeFromBasket);
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rate,
      description,
      category,
      image,
      hasPrime,
    };
    addToBasket(product);
    //add more items to basket from checkout page
  };
  const removeItemFromBasket = () => {
    removeFromBasket({ id });
    //remove the item from basket
  };
  return (
    <div className="grid grid-cols-5">
      {/* left section */}
      <Image
        src={image}
        height={200}
        width={200}
        className="object-contain"
        alt="prod"
      />
      {/* middle section */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <HiStar className="h-5 text-yellow-500" key={i} />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="GBP" />
        {hasPrime < 3 ? (
          <div className="flex items-center space-x-2">
            <img src="/prime.png" alt="prime" loading="lazy" className="w-12" />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        ) : null}
      </div>
      {/* right section */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="btn" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="btn" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
