export const getAlphabeticallyOrdered = (array: any[], orderKey: string): any[] => {
  const ordered = [...array];
  return ordered.sort((a, b) => a[orderKey].localeCompare(b[orderKey]));
}