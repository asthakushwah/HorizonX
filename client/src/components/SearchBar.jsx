import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative flex-1">
      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-card border border-border rounded-xl2 pl-11 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-hover transition-colors"
      />
    </div>
  );
}
