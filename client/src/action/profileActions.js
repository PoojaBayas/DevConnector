import axios from "axios"

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then()
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
    }))
}
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile', expData)
    .then()
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
    }))
}
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile', eduData)
    .then()
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
    }))
 }