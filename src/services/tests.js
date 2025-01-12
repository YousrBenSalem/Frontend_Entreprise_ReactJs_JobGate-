/* eslint-disable import/no-anonymous-default-export */
import axiosContext from "./axiosContext";
const createTest= (data) =>{
  return axiosContext.post('/test' , data)
}
const updateTest= (id , data) =>{
  return axiosContext.put(`/test/${id}` , data)
}
const getTests= () =>{
  return axiosContext.get(`/test`)
}

const getTestById= (id) =>{
  return axiosContext.get(`/test/${id}`)
}

const deleteTest= (id) =>{
  return axiosContext.delete(`/test/${id}`)
}



export default {createTest , updateTest, getTests, getTestById , deleteTest };