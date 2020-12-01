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
export function allComic() {
  return axios.get(`${base}/comic/all`);
}
//user
export function rigist(mail, name, password) {
  return axios.post(`${base}/user/rigist`, { data: { mail, name, password } });
}
export function login(mail, password) {
  return axios.post(`${base}/user/login`, { data: { mail, password } });
}
export function userInfo() {
  return axios.post(`${base}/user/info`);
}
//修改头像
export function changeHeadImg(id) {
  return axios.post(`${base}/user/changeheadimg`, { data: { id } });
}
//获取所有头像
export function allHeadImg() {
  return axios.get(`${base}/common/allhead`);
}
//修改用户名

export function changeNickName(name) {
  return axios.post(`${base}/user/changenickname`, { data: { name } });
}
//修改密码

export function changePsd(psd) {
  return axios.post(`${base}/user/changepsd`, { data: { psd } });
}
//收藏

export function collect(comic_id) {
  return axios.post(`${base}/user/collect`, { data: { comic_id } });
}
//点赞

export function like(comic_id) {
  return axios.post(`${base}/user/like`, { data: { comic_id } });
}
//添加历史记录
export function addRecord(comic_id, chapter_id, title, chapter_title) {
  return axios.post(`${base}/user/addrecord`, {
    data: { comic_id, chapter_id, title, chapter_title }
  });
}

//chapter
export function chapterDetail(comicId, chapterId) {
  return axios.get(`${base}/chapter`, { params: { comicId, chapterId } });
}
//图片
export function imgList(chapterId) {
  return axios.get(`${base}/chapter/imgList`, { params: { chapterId } });
}

//留言

export function messageList() {
  return axios.get(`${base}/common/messagelist`);
}

export function leaveMessage(message, cover_img, name) {
  return axios.post(`${base}/user/leavemessage`, {
    data: { message, cover_img, name }
  });
}
