import { local as base } from "./base";
import axios from "../http";

//common
export function tag() {
  return axios.get(`${base}/common/tag`);
}

//homepage
export function hotSearch() {
  return axios.get(`${base}/homepage/hotSearch`);
}
export function banner() {
  return axios.get(`${base}/homepage/banner`);
}
export function suggest() {
  return axios.get(`${base}/homepage/suggest`);
}
export function fuzzy(title) {
  return axios.get(`${base}/homepage/fuzzy`, { params: { title } });
}
export function search(title) {
  return axios.get(`${base}/homepage/search`, { params: { title } });
}

//comic
export function comic(id) {
  return axios.get(`${base}/comic`, { params: { id } });
}
//user
export function rigist(mail, name, password) {
  return axios.post(`${base}/sign/rigist`, { data: { mail, name, password } });
}
export function login(mail, password) {
  return axios.post(`${base}/sign/login`, { data: { mail, password } });
}
