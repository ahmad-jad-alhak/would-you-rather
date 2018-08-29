
const SET_AUTHED_USER = 'SET_AUTHED_USER'

export default function receiveUsers(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}