import axios from "axios";
export const apiRequest = (searchValue, page) => {
  const KEY = "22603230-d9263c0bbd59724fbb3598b9f";
  const API = `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=20`;
  return axios.get(API).then((r) => r.data);
};
