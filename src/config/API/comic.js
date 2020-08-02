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
  }
};

export default comic;
