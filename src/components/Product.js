import Image from "next/image";
import Currency from "react-currency-formatter";
import useStore from "../app/ZustandStore";

import { HiStar } from "react-icons/hi";
const Product = ({ id, title, description, category, image, rate, price }) => {
  const hasPrime = parseInt(rate, 10);
  const rating = parseInt(rate, 10);
  const addToBasket = useStore((state) => state.addToBasket);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rate,
      hasPrime,
    };

    addToBasket(product);
    //add product object to ZustandStore when click on add to basket button
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-md">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        height={200}
        width={200}
        className="object-contain"
        alt="product"
      />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <HiStar className="h-5 text-yellow-500" key={i} />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>

      {hasPrime < 3 ? (
        <div className="flex items-center space-x-2 -mt-5">
          <img src="prime.png" alt="prime" className="w-12" />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      ) : null}

      <button className="mt-auto btn" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
