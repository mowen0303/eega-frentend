import {
    USER_GET,
    USER_LOGIN,
    USER_UPDATE_MY_PROFILE
} from "./types";
import Helper from "../../helper";
import axios from "axios";
import Cookies from 'js-cookie';


export const login = (username, password) => async dispatch => {
    try {
        const url = `${Helper.host}/restAPI/userController.php?action=login`;
        const res = await axios.post(url, {
            user_name: username,
            user_pwd: password,
            marketing: true
        }, Helper.hostHeaders);
        if(res.data.result){
            dispatch({
                type: USER_LOGIN,
                error:null,
                data: res.data.result
            });
        }else{
            throw new Error("failed")
        }
        
    } catch (e) {
        dispatch({
            type: USER_LOGIN,
            error: e && e.response && e.response.data && e.response.data.message || 'failed',
        });
    }
};


export const isLogin = () => async dispatch => {
    try {
        let cookie = {
            cc_id:Cookies.get("cc_id"),
            user_avatar:Helper.host+Cookies.get("user_avatar"),
            cc_na:Cookies.get("cc_na"),
            user_first_name:Cookies.get("user_first_name"),
            user_last_name:Cookies.get("user_last_name"),
        };
        if(cookie.cc_id){
            global.auth = cookie;
            dispatch({
                type: USER_LOGIN,
                error:null,
                data: cookie
            });
        }
    } catch (e) {

    }
};

export const logout = () => async dispatch => {
    try {
        const url = `${Helper.host}/restAPI/userController.php?action=logout`;
        const res = await axios.post(url, null, Helper.hostHeaders);
        dispatch({
            type: USER_LOGIN,
            error:null,
            data: {}
        });
    } catch (e) {

    }
};

export const getUser = (userId) => async dispatch => {
    try {
        const url = `${Helper.host}/restAPI/userController.php?action=getMyProfile`;
        const res = await axios.get(url, Helper.hostHeaders);
        if(res.data.result){
            dispatch({
                type: USER_GET,
                error:null,
                data: res.data.result
            });
        }else{
            throw new Error("failed")
        }
        
    } catch (e) {
        dispatch({
            type: USER_GET,
            error: e && e.response && e.response.data && e.response.data.message || 'failed',
            data:{}
        });
    }
};

export const updateMyProfile = (data,callback) => async dispatch => {
    try {
        let formData = new FormData();
        formData.append("imgFile[]",data.user_avatar);
        formData.append("user_first_name",data.user_first_name);
        formData.append("user_last_name",data.user_last_name);
        formData.append("user_phone",data.user_phone);
        formData.append("user_month",data.user_month);
        formData.append("user_day",data.user_day);
        formData.append("user_email",data.user_email);

        const url = `${Helper.host}/restAPI/userController.php?action=updateMyProfile`;
        // const res = await axios.post(url,{
        //     user_last_name: data.user_last_name,
        //     user_first_name: data.user_first_name,
        //     user_phone: data.user_phone,
        //     user_email: data.user_email,
        //     imgFile: data.user_avatar,
        // }, Helper.hostHeaders);
        const res = await axios.post(url,formData, Helper.hostHeaders);
        
        if(res.data.result){
            dispatch({
                type: USER_UPDATE_MY_PROFILE,
                error:null,
                data: res.data.result
            });
            alert('信息更新成功');
        }else{
            throw new Error(res.data.message)
        }
        
    } catch (e) {
        dispatch({
            type: USER_UPDATE_MY_PROFILE,
            error: e && e.response && e.response.data && e.response.data.message || 'failed',
        });
    }
};

export const updateMyPin = (data) => async dispatch => {
    try {
        const url = `${Helper.host}/restAPI/userController.php?action=updateMyPin`;
        const res = await axios.post(url,{}, Helper.hostHeaders);
        if(res.data.result){
            dispatch({
                type: USER_UPDATE_MY_PROFILE,
                error:null,
                data: res.data.result
            });
        }else{
            throw new Error(res.data.message)
        }
        
    } catch (e) {
        dispatch({
            type: USER_UPDATE_MY_PROFILE,
            error: e && e.response && e.response.data && e.response.data.message || 'failed',
        });
    }
};


