import { getUsers } from '../utils/api'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOG_OUT = 'LOG_OUT'


export default function getAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}


export function handleSetAuthUser(id) {
    return (dispatch) => {
  
      return getUsers()
        .then((users) => {
          const auth = Object.keys(users).filter(user => user === id);
          auth.length === 0 ?
            dispatch(getAuthedUser(null)) :
            dispatch(getAuthedUser(id));
        })
    };
}

export function logOut() {
    return {
        type: LOG_OUT
    }
}