import { create } from "zustand";

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  brand: string;
  sizes: string[];
  color: string;
  items_Left: number;
};

export type FilterState = {
  brands: string[];
  color: string;
  size: string;
  price: [number, number];
};

export type SortType = "recent" | "priceAsc" | "priceDesc" | "alphaAsc" | "alphaDesc";

type StoreState = {
  products: Product[];
  cart: Product[];
  search: string;
  filter: FilterState;
  sort: SortType;
  isCartOpen: boolean;
  isFilterOpen: boolean;

  setSearch: (val: string) => void;
  setFilter: (val: FilterState) => void;
  setSort: (val: SortType) => void;
  toggleCart: () => void;
  toggleFilter: () => void;

  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  setProducts: (p: Product[]) => void;
};

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  cart: [],
  search: "",
  filter: { brands: [], color: "", size: "", price: [0, 300] },
  sort: "recent",
  isCartOpen: false,
  isFilterOpen: false,

  setSearch: (val) => set({ search: val }),
  setFilter: (val) => set({ filter: val }),
  setSort: (val) => set({ sort: val }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
  toggleFilter: () => set((s) => ({ isFilterOpen: !s.isFilterOpen })),

  addToCart: (id) => {
    const { products, cart } = get();
    const product = products.find((p) => p.id === id);
    if (product && product.items_Left > 0) {
      set({
        products: products.map((p) =>
          p.id === id ? { ...p, items_Left: p.items_Left - 1 } : p
        ),
        cart: [...cart, product],
      });
    }
  },
  removeFromCart: (id) => {
    set((s) => ({
      cart: s.cart.filter((p) => p.id !== id),
    }));
  },
  setProducts: (p) => set({ products: p }),
}));
