import { useState, useMemo, useRef, useEffect } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";

const productsData = [
  { id: 1, name: "Black Nike T-Shirt", image: "Products_image/image1.png", price: 30, brand: "Nike", sizes: ["S", "M", "L"], color: "black", items_Left: 12 },
  { id: 2, name: "Adidas Classic Tee", image: "Products_image/image2.png", price: 40, brand: "Adidas", sizes: ["S", "M", "L"], color: "gray", items_Left: 8 },
  { id: 3, name: "Puma Running Shoes", image: "Products_image/image3.png", price: 120, brand: "Puma", sizes: ["S", "M", "L", "XL"], color: "white", items_Left: 5 },
  { id: 4, name: "Reebok Hoodie", image: "Products_image/image4.png", price: 80, brand: "Reebok", sizes: ["S", "M", "L"], color: "red", items_Left: 3 },
];

const brands = [
  { name: "Nike", image: "/Brand_image/nike-3-logo-svg-vector.svg" },
  { name: "Adidas", image: "/Brand_image/Adidas_Logo.svg" },
  { name: "Puma", image: "/Brand_image/puma-black-logo-png-701751694774568gw2on2y0un.png" },
  { name: "Reebok", image: "/Brand_image/reebok-5-logo-svg-vector.svg" },
  { name: "Under Armour", image: "/Brand_image/Under-Armour-Logo-PNG-Isolated-HD.png" },
  { name: "Gucci", image: "/Brand_image/Gucci-Logo-PNG-HD.png" },
  { name: "Louis Vuitton", image: "/Brand_image/Louis-Vuitton-Logo.png" },
  { name: "Zara", image: "/Brand_image/Zara_(retailer)-Logo.wine.svg" },
  { name: "H&M", image: "/Brand_image/HM-Logo-PNG-File.png" },
  { name: "Levi's", image: "/Brand_image/Levis-Logo-PNG-HD.png" },
];

const App = () => {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ brands: [] as string[], color: "", size: "", price: [0, 300] });
  const [sort, setSort] = useState("recent");
  const [isCartOpen, setCartOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const cartRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCartOpen && cartRef.current && !cartRef.current.contains(event.target as Node)) setCartOpen(false);
      if (isFilterOpen && filterRef.current && !filterRef.current.contains(event.target as Node)) setFilterOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen, isFilterOpen]);

  const handleAddToCart = (productId: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId && p.items_Left > 0
          ? { ...p, items_Left: p.items_Left - 1 }
          : p
      )
    );
    const product = products.find(p => p.id === productId);
    if (product && product.items_Left > 0) setCart([...cart, product]);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (filter.brands.length && !filter.brands.includes(p.brand)) return false;
        if (filter.color && p.color !== filter.color) return false;
        if (filter.size && !p.sizes.includes(filter.size)) return false;
        if (p.price < filter.price[0] || p.price > filter.price[1]) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "priceAsc") return a.price - b.price;
        if (sort === "priceDesc") return b.price - a.price;
        if (sort === "alphaAsc") return a.name.localeCompare(b.name);
        if (sort === "alphaDesc") return b.name.localeCompare(a.name);
        if (sort === "recent") return b.id - a.id;
        return 0;
      });
  }, [filter, sort, search, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cart.length}
        search={search}
        setSearch={setSearch}
        onCartToggle={() => setCartOpen(!isCartOpen)}
        onFilterToggle={() => setFilterOpen(!isFilterOpen)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <div className="hidden md:block">
          <Filters filter={filter} setFilter={setFilter} brands={brands} />
        </div>

        <ProductGrid
          products={filteredProducts}
          sort={sort}
          setSort={setSort}
          onAddToCart={(id: number) => handleAddToCart(id)} // pass ID

        />
      </main>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 flex">
          <div ref={filterRef} className="bg-white w-64 h-full p-4 shadow-xl transform transition-transform">
            <Filters filter={filter} setFilter={setFilter} brands={brands} />
            <button onClick={() => setFilterOpen(false)} className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}

      <div ref={cartRef} className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-auto transform transition-transform z-50 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <Cart cart={cart} onRemove={(id) => setCart(cart.filter(p => p.id !== id))} />
      </div>
    </div>
  );
};

export default App;
