import { SET_CURRENT_USER } from './types';

//register user
export const registerUser = (userData) => {
  return {
    type: SET_CURRENT_USER,
    payload:userData
    
  }
}