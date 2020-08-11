import { local as base } from "./base";
import axios from "../http";

const comic = {
  hotSearch() {
    return axios.get(`${base}/comic/hotSearch`);
  },
  banner() {
    return axios.get(`${base}/comic/bannerInfo`);
  },
  suggest() {
    return axios.get(`${base}/comic/suggest`);
  },
  search(title) {
    return axios.get(`${base}/comic/search`, { params: { title } });
  },
  getComic(id) {
    return axios.get(`${base}/comic/${id}`);
  }
};

export default comic;
