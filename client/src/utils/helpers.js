// Small shared helpers used across pages/components.

export function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

export function formatNumber(num) {
  if (num === undefined || num === null) return "—";
  return new Intl.NumberFormat("en-US").format(num);
}

export function truncate(text, max = 120) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}
