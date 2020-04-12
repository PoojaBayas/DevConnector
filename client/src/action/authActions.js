import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode';

//register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push('/login'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//login-get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //const token=res.data.token
      const { token } = res.data;
      
      //save the token to localstorage
      //set the token to axios auth 
      setAuthToken(token);
      //decode the token to get the user data 
      const decoded = jwt_decode(token);
      //Dispatch call to SER_CURRENT_USER
      dispatch({
        type: SET_CURRENT_USER,
        payload:decoded
      })
    })
  .catch((err) =>
  dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }))
}

