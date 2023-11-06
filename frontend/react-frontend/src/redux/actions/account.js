import {CALL_API} from "../middlewares/api/api";
import * as actionTypes from "./actionTypes";
import * as urls from "./urls";

export const getUserInfo = () => ({
    [CALL_API]: {
        types: [
            actionTypes.GET_USER_INFO_REQUEST,
            actionTypes.GET_USER_INFO_SUCCESS,
            actionTypes.GET_USER_INFO_FAILURE,
        ],
        url: urls.GET_USER_INFO,
        fetchOptions: {
            method: 'GET',
        },
    },
});
