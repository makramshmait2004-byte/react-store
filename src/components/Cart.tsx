type Props = {
  cart: any[];
  onRemove: (id: number) => void;
};

export default function Cart({ cart, onRemove }: Props) {
  return (
    <aside>
      <h3 className="font-bold mb-3">Cart</h3>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex gap-3 items-center mb-3">
            <img src={item.image} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm">SAR {item.price}</p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </aside>
  );
}
