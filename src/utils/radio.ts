export const generateRadioChannel = (skip: string[]): string => {
  let radio = "";
  do {
    radio = `${((Math.random() * (99999 - 10000) + 10000) / 100).toFixed(2)}`;
  } while (skip.includes(radio));
  return radio;
}