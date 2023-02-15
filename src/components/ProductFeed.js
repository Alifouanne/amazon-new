import { Product } from "../components";

/* import dynamic from "next/dynamic";
const Product = dynamic(() => import("../components/Product"), { ssr: false }); */
const ProductFeed = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto ">
      {products
        ?.slice(0, 4)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rate={rating.rate}
          />
        ))}
      <img src="/images/ad.jpg" alt="ad" className="col-span-full m-auto" />
      <div className="md:col-span-2">
        {products
          ?.slice(4, 5)
          .map(({ id, title, price, description, category, image, rating }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rate={rating.rate}
            />
          ))}
      </div>
      {products
        ?.slice(5, products.legth)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rate={rating.rate}
          />
        ))}
    </div>
  );
};

export default ProductFeed;
