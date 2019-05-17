import axios from "axios";
const APIURL = process.env.REACT_APP_BACKEND_URL;

//USERS METHODS-----------------------------------------------------------------

export const getOneUser = id => axios.get(`${APIURL}/user/${id}`);

export const getUserByName = name => axios.get(`${APIURL}/user/name/${name}`);

export const updateOneUser = (id, infos) => axios.put(`${APIURL}/user/${id}`, infos);

//IDEAS METHODS-----------------------------------------------------------------

export const getAllIdeas = queryString => axios.get(`${APIURL}/idea/${queryString}`);

// export const getSortIdeas = () => axios.get(`${APIURL}/idea/filter`)

export const createOneIdea = (infos) => axios.post(`${APIURL}/idea/`, infos);

export const getOneIdea = id => axios.get(`${APIURL}/idea/${id}`);

export const updateOneIdea = (id, infos) => axios.put(`${APIURL}/idea/${id}`, infos);

export const upvoteIdea = (id, infos) => axios.put(`${APIURL}/idea/upvote/${id}`, infos);

export const deleteOneIdea = (id) => axios.delete(`${APIURL}/idea/${id}`);


//COMMENTS METHODS--------------------------------------------------------------

export const createOneComment = (infos) => axios.post(`${APIURL}/comment/`, infos)

export const getAllComments = (id) => axios.get(`${APIURL}/comment/${id}`)

//COMMENTS METHODS--------------------------------------------------------------

export const updateAvatar = (img) => axios.patch(`${APIURL}/user/add-avatar/`, img, { headers: {
  "Content-Type":  "multipart/form-data"
}}) //route should be from cloudInary ?



export default {
  getOneIdea,
  createOneIdea,
  updateOneIdea,
  updateOneUser,
  getOneUser,
  getAllComments,
  updateAvatar 
}