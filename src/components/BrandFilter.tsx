type Props = {
  filter: any;
  setFilter: (val: any) => void;
  brands: { name: string; image: string }[];
};

export default function BrandFilter({ filter, setFilter, brands }: Props) {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2">Brand</p>
      <div className="flex flex-col gap-2 max-h-40 overflow-auto">
        {brands.map((b) => (
          <label key={b.name} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filter.brands.includes(b.name)}
              onChange={() =>
                setFilter({
                  ...filter,
                  brands: filter.brands.includes(b.name)
                    ? filter.brands.filter((x: string) => x !== b.name)
                    : [...filter.brands, b.name],
                })
              }
            />
            {b.image && <img src={b.image} alt={b.name} className="h-5" />}
            <span>{b.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
