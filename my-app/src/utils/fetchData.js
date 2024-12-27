// utils/fetchData.js
export const fetchGameData = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=6"
  );
  const data = await response.json();
  return await data.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
  }));
};
