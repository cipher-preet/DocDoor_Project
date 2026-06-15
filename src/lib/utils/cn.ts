type ClassValue = bigint | boolean | null | number | string | undefined;

export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}
