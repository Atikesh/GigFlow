export const formatPrice = (num) => {
  return `₹${num.toLocaleString("en-IN")}`;
};

export const trimText = (text, limit = 100) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
