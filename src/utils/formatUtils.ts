
export function formatDate(dateStr?: string | null) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}

export function formatCurrency(amount?: number | null) {
  if (amount == null) return "—";
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "ZAR" }).format(amount);
}
