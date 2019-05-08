import axios from "axios";
const APIURL = "http://localhost:8888/api";

//GET USERS METHODS-----------------------------------------------------------------

export const getOneUser = id => axios.get(`${APIURL}/user/${id}`);

export const updateOneUser = (id, infos) => axios.post(`${APIURL}/user/${id}`, infos);

//GET IDEAS METHODS-----------------------------------------------------------------

export const getAllIdeas = () => axios.get(`${APIURL}/idea`);

export const createOneIdea = (infos) => axios.post(`${APIURL}/idea/`, infos);

export const getOneIdea = id => axios.get(`${APIURL}/idea/${id}`);

export const updateOneIdea = (id, infos) => axios.post(`${APIURL}/idea/${id}`, infos);

//GET COMMENTS METHODS--------------------------------------------------------------

export default {
  getOneIdea,
  createOneIdea,
  updateOneIdea,
  updateOneUser,
  getOneUser
}