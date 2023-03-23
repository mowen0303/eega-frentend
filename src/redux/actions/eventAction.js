import {
    EVENT_GET_LIST,
} from "./types";
import Helper from "../../helper";
import axios from "axios";


export const getEventList = () => async dispatch => {
    try {
        const url = `${Helper.host}/restAPI/eventController.php?action=getValidateEventList`;
        const res = await axios.get(url, Helper.hostHeaders);
        if(res.data.result){
            dispatch({
                type: EVENT_GET_LIST,
                error:null,
                data: res.data.result
            });
        }else{
            throw new Error("failed")
        }
    } catch (e) {
        dispatch({
            type: EVENT_GET_LIST,
            error: e && e.response && e.response.data && e.response.data.message || 'failed',
        });
    }
};