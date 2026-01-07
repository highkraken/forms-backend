export function isEmptyString(
  str: string | undefined,
  trim: boolean = true
): boolean {
  return trim ? !str?.trim().length : !str?.length;
}
