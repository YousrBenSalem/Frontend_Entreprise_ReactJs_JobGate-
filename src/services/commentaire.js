/* eslint-disable import/no-anonymous-default-export */
import axiosContext from "./axiosContext";
const createCommentaire= (data) =>{
  return axiosContext.post('/commentaire' , data)
}
const updateCommentaire= (id , data) =>{
  return axiosContext.put(`/commentaire/${id}` , data)
}


const getCommentaires= () =>{
  return axiosContext.get(`/commentaire`)
}

const getCommentaireById= (id) =>{
  return axiosContext.get(`/commentaire/${id}`)
}

const deleteCommentaire= (id) =>{
  return axiosContext.delete(`/commentaire/${id}`)
}



export default {createCommentaire , updateCommentaire, getCommentaires, getCommentaireById , deleteCommentaire };