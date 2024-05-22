export const checkImageURL = (url: string) => {
  const isValid = new RegExp(
    "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
    "i",
  ).test(url);
  return isValid;
};
