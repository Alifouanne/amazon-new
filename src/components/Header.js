import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import useStore from "../app/ZustandStore";
const Header = () => {
  const router = useRouter();
  const items = useStore((state) => state.items);

  const { data: session } = useSession();

  return (
    <header>
      {/* top nav */}
      <div className="flex items-center  bg-amazon_blue p-1 grow py-2">
        <div className="mt-2 flex items-center grow sm:grow-0 mx-6">
          <Image
            src="/images/amazon.png"
            width={150}
            height={40}
            alt="amazon logo"
            className="object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        {/* search bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 h-full w-6 grow shrink rounded-l-md focus:outline-none px-1"
          />
          <div className="h-12 px-4 py-4">
            <AiOutlineSearch />
          </div>
        </div>
        {/* right top nav */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            className="link"
            onClick={!session ? () => signIn() : () => signOut()}
          >
            <p>{session ? `Hello‚ ${session.user.name}` : `Sign in`}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div
            onClick={() => session && router.push("/orders")}
            className="link "
          >
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            className="link relative flex items-center"
            onClick={() => router.push("/checkout")}
          >
            <span
              className="absolute top-0 right-0 md:right-11 w-4
            h-4 bg-yellow-400 text-center rounded-full text-black font-bold"
            >
              {items.length}
            </span>
            <AiOutlineShoppingCart fontSize={40} />
            <p className="font-extrabold md:text-sm hidden md:inline mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* bottom nav  */}
      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6">
        <p className="link flex items-center">
          <AiOutlineMenu className="mr-1 " height={"24px"} /> All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
