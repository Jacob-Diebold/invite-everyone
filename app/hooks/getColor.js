import colors from "../styles/colors";
const randomItem = (array) => {
  return Math.floor(Math.random() * array.length);
};

const getColor = () => {
  return colors.colorPallette[randomItem(colors.colorPallette)];
};
export default getColor;
