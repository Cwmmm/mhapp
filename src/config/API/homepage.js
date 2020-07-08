import base from "./base";
import axios from "../http";

const homepage = {
  hotSearch() {
    return axios.get(`${base.easy_mock}/hotSearch`);
  },
  banner() {
    return axios.get(`${base.easy_mock}/banner`);
  }
};

export default homepage;
