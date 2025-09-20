type Props = {
  cartCount: number;
  search: string;
  setSearch: (val: string) => void;
  onCartToggle: () => void;
  onFilterToggle: () => void;
};

export default function Header({ cartCount, search, setSearch, onCartToggle, onFilterToggle }: Props) {
  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        <h1 className="text-xl font-bold">Shoping Store</h1>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border rounded-lg px-3 py-1 w-60 hidden md:block"
          />
          <button
            onClick={onFilterToggle}
            className="md:hidden px-3 py-1 border rounded-lg bg-gray-100"
          >
            Filter
          </button>
          <button className="relative p-2" onClick={onCartToggle}>
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
