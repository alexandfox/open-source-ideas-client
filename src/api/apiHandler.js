import axios from "axios";
const APIURL = "http://localhost:8888/api";

//USERS METHODS-----------------------------------------------------------------

export const getOneUser = id => axios.get(`${APIURL}/user/${id}`);

export const getUserByName = name => axios.get(`${APIURL}/user/name/${name}`);

export const updateOneUser = (id, infos) => axios.put(`${APIURL}/user/${id}`, infos);

//DEAS METHODS-----------------------------------------------------------------

export const getAllIdeas = () => axios.get(`${APIURL}/idea`);

export const createOneIdea = (infos) => axios.post(`${APIURL}/idea/`, infos);

export const getOneIdea = id => axios.get(`${APIURL}/idea/${id}`);

export const updateOneIdea = (id, infos) => axios.put(`${APIURL}/idea/${id}`, infos);

//GET COMMENTS METHODS--------------------------------------------------------------

export const createOneComment = (infos) => axios.post(`${APIURL}/comment/`, infos)


export default {
  getOneIdea,
  createOneIdea,
  updateOneIdea,
  updateOneUser,
  getOneUser
}