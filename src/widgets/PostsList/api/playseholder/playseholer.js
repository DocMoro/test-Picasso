import axios from "axios";

import { API_URL } from "../../constants/constants";

const api = axios.create({
  baseURL: API_URL,
});

async function getPosts(length, page) {
  const result = {
    hasError: false,
    errorMessage: "",
    data: null,
  };

  try {
    const response = await api.get(`/posts?_page=${page}&_limit=${length}`);
    result.data = response.data;
  } catch(err) {
    result.hasError = true;
    result.errorMessage = err.message || "Что-то сильно пошло не так";
  }

  return result;
}

export {
  getPosts,
};