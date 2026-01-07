export function isValidDate(date: string): boolean {
  const timestamp = Date.parse(date.trim());
  return !Number.isNaN(timestamp);
}

export function isDateLike(value: unknown): boolean {
  if (value instanceof Date) return !isNaN(value.getTime());
  if (typeof value === "string") return !isNaN(Date.parse(value));
  return false;
}

export function toTimestamp(value: Date | string): number {
  return value instanceof Date ? value.getTime() : Date.parse(value);
}
