/* eslint-disable import/no-anonymous-default-export */
import axiosContext from "./axiosContext";
const createEntreprise= (data) =>{
  return axiosContext.post('/entreprise' , data)
}

const getEntrepriseById= (id) =>{
  return axiosContext.get(`/entreprise/${id}`)
}

const updateEntreprise= (id , data) =>{
  return axiosContext.put(`/entreprise/${id}` , data)
}



export default {createEntreprise, getEntrepriseById,
  updateEntreprise
};