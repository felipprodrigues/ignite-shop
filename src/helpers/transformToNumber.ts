export default function toNumber(unitAmount: number) {
  const format = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(unitAmount / 100);

  return format;
}
