import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store"

import { getUserInformation } from "../../redux/thunks/user";

export default function UserInformation() {

  const userId = localStorage.getItem("id") || "{}";

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserInformation(userId));
  }, [dispatch, userId]);

  const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

  return <div>
    <p><strong>This is User Information</strong></p>
    <p>Email: {userInfoDetails.email}</p>
    <p>Name: {userInfoDetails.fullname}</p>
    <button>Edit info</button>
  </div>
}