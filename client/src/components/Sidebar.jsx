import { classNames } from "../utils/helpers";

export default function Sidebar({ title, options, active, onChange }) {
  return (
    <aside className="w-full lg:w-56 shrink-0 rounded-xl2 border border-border bg-card p-5 h-fit">
      <h4 className="font-display text-sm font-semibold mb-4 text-white/80">
        {title}
      </h4>
      <div className="flex flex-wrap lg:flex-col gap-2">
        <button
          onClick={() => onChange(null)}
          className={classNames(
            "text-left text-sm px-3 py-2 rounded-xl2 transition-colors",
            active === null ? "bg-white text-black" : "text-white/50 hover:bg-white/5"
          )}
        >
          All
        </button>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={classNames(
              "text-left text-sm px-3 py-2 rounded-xl2 transition-colors",
              active === opt ? "bg-white text-black" : "text-white/50 hover:bg-white/5"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </aside>
  );
}
