import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

//Global store setup
let Store = (set, get) => ({
  items: [],

  addToBasket: (product) =>
    set((state) => ({
      items: [...state.items, product],
    })),
  removeFromBasket: ({ id }) => {
    set((state) => {
      const index = state.items.findIndex((item) => item.id === id);
      console.log(index);
      let newBasket = [...state.items];

      index >= 0
        ? newBasket.splice(index, 1)
        : console.warn(`Can't remove product (id:${id}) as its not in basket`);

      return {
        ...state,
        items: newBasket,
      };
    });
  },
});
Store = devtools(
  persist(Store, {
    name: "basket-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
);

const useStore = create(Store);
export default useStore;
