type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image?: string;
  items_Left: number;
};

type ProductCardProps = {
  product: Product;
  onAdd?: () => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <div className="relative">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-56 object-cover rounded-xl"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:scale-110 transition">
          ♡
        </button>
      </div>
      <div className="mt-4 flex flex-col flex-grow">
        <h4 className="font-semibold text-lg">{product.name}</h4>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-sm text-gray-400">Items Left: {product.items_Left}</p>

        <div className="mt-3 flex justify-between items-center">
          <span className="font-bold text-blue-600">SAR {product.price}</span>
         <button
  onClick={onAdd}
  disabled={product.items_Left === 0}
  className={`px-4 py-1.5 text-white text-sm rounded-lg transition ${
    product.items_Left === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {product.items_Left === 0 ? "Sold Out" : "Add to Cart"}
</button>

        </div>
      </div>
    </div>
  );
}
