import { userInfoActions } from "../slices/user";
import { AppDispatch } from "../store";

export function getUserInformation(id: string) {
    const token = localStorage.getItem("token");
    const url = `http://localhost:8000/users/${id}`
    return async (dispatch: AppDispatch) => {
        const res = await fetch(url, {headers: {Authorization: `Bearer ${token}`}});
        const userInfoData = await res.json();
        dispatch(userInfoActions.getUserInfo(userInfoData));
    }
}