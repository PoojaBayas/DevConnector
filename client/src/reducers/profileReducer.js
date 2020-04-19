import { PROFILE_LOADING, GET_PROFILE,GET_PROFILES } from "../action/types";

const initialState = {
  profile: null, //entire profile of the user
  profiles: null, //other users profile
  loading: false //spinner for loading the profile
};
export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading:true
      }
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile:action.payload
      }
      case GET_PROFILES:
        return {
          ...state,
          loading: false,
          profiles:action.payload
      }
    case CLEAR_CURRENT_PROFILES:
      return {
        ...state,
        profile:null
      }
    default:
      return state;
  }
}