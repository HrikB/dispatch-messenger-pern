export default (s: string | undefined): string => {
  if (s === undefined) return "";
  return s
    .split("")
    .map((letter, i) => {
      if (i == 0) return letter.toUpperCase();
      return letter.toLowerCase();
    })
    .join("");
};
