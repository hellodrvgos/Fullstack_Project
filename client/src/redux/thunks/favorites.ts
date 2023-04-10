import { favoritesActions } from "../slices/favorites";
import { AppDispatch } from "../store";

export function getFavoritesListInfo(id: string) {
    const token = localStorage.getItem("token");
    const url = `http://localhost:8000/favorites/${id}`
    return async (dispatch: AppDispatch) => {
        const res = await fetch(url, {headers: {Authorization: `Bearer ${token}`}});
        const favoritesData = await res.json();
        dispatch(favoritesActions.getFavoritesList(favoritesData));
    }
}