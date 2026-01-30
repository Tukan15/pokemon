interface FiltersProps {
  types: { name: string }[];
  selectedType: string;
  onTypeChange: (type: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  loading: boolean;
  showOnlyCaught: boolean;
  onCaughtToggle: () => void;
}

export const Filters = ({ 
  types, 
  selectedType, 
  onTypeChange, 
  searchQuery, 
  onSearchChange, 
  loading,
  showOnlyCaught,
  onCaughtToggle
}: FiltersProps) => (
  <aside className="w-full md:w-64 space-y-12">
    <section>
      <h2 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6 italic">Filters</h2>
      <div className="relative border-b border-gray-200 pb-2 flex items-center">
        <span className="mr-2 opacity-40">🔍</span>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full outline-none text-sm placeholder-gray-300 bg-transparent text-black"
        />
      </div>
    </section>

    <section>
      <label className="block text-gray-700 font-bold text-[11px] mb-3 uppercase tracking-tighter">
        Pokemon Types
      </label>
      <div className="relative border border-gray-200 rounded-md">
        <select 
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="w-full p-3 pr-10 text-sm text-gray-500 bg-white rounded-md appearance-none outline-none focus:ring-1 focus:ring-poke-blue"
        >
          <option value="">{loading ? "Loading..." : "Select..."}</option>
          {types.map((type) => (
            <option key={type.name} value={type.name} className="capitalize">
              {type.name}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
          ▼
        </div>
      </div>
    </section>

    <div className="flex items-center gap-3">
      <input 
        type="checkbox" 
        id="caught" 
        checked={showOnlyCaught}
        onChange={onCaughtToggle}
        className="w-4 h-4 rounded border-gray-300 accent-poke-blue cursor-pointer shadow-sm" 
      />
      <label htmlFor="caught" className="text-xs font-semibold text-gray-600 cursor-pointer select-none">
        Only show caught Pokemon
      </label>
    </div>
  </aside>
);