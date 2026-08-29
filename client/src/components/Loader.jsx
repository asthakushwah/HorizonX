import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-white/40 gap-3">
      <Loader2 className="w-6 h-6 animate-spin" />
      <p className="text-sm">{label}…</p>
    </div>
  );
}
