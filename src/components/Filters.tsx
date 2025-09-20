import BrandFilter from "./BrandFilter";

interface FilterProps {
  filter: any;
  setFilter: (val: any) => void;
  brands: { name: string; image: string }[];
}

export default function Filters({ filter, setFilter, brands }: FilterProps) {
  const colors = ["black", "white", "gray", "red", "blue", "green", "yellow"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <aside className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">Filter</h3>
      <BrandFilter filter={filter} setFilter={setFilter} brands={brands} />

      {/* Size Filter */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              className={`px-2 py-1 rounded border ${filter.size === s ? "bg-blue-600 text-white" : "bg-gray-100"}`}
              onClick={() => setFilter({ ...filter, size: filter.size === s ? "" : s })}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              className={`w-6 h-6 rounded-full border ${filter.color === c ? "ring-2 ring-blue-600" : ""}`}
              style={{ backgroundColor: c }}
              onClick={() => setFilter({ ...filter, color: filter.color === c ? "" : c })}
            />
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Price</p>
        <input
          type="range"
          min={0}
          max={300}
          value={filter.price[1]}
          onChange={(e) => setFilter({ ...filter, price: [0, Number(e.target.value)] })}
          className="w-full"
        />
        <p className="text-sm text-gray-500">Up to SAR {filter.price[1]}</p>
      </div>
    </aside>
  );
}
