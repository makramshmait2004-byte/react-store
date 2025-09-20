import ProductCard from "./ProductCard";

type Props = {
  products: any[];
  sort: string;
  setSort: (val: string) => void;
  onAddToCart: (id: number) => void; // receive ID
};

export default function ProductGrid({ products, sort, setSort, onAddToCart }: Props) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">{products.length} results</h2>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="recent">Recently Added</option>
          <option value="priceAsc">Price Ascending</option>
          <option value="priceDesc">Price Descending</option>
          <option value="alphaAsc">Alphabetical A–Z</option>
          <option value="alphaDesc">Alphabetical Z–A</option>
        </select>
      </div>

<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={() => onAddToCart(p.id)} />
        ))}
      </div>
    </section>
  );
}
