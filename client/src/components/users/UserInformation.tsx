import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store"

import { getUserInformation } from "../../redux/thunks/user";
import UserInformationUpdate from "./UserInformationUpdate";

export default function UserInformation() {

  const userId = localStorage.getItem("id") || "{}";

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserInformation(userId));
  }, [dispatch, userId]);

  const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

  const [isShown, setIsShown] = useState(false);

    function handleClick() {
        setIsShown(current => !current);
      };

  return <div>
    <p><strong>UserInformation</strong></p>
    <p>Email: {userInfoDetails.email}</p>
    <p>Name: {userInfoDetails.fullname}</p>
    <button onClick={handleClick}>Edit info</button>
    {
        isShown && <UserInformationUpdate/>
    }

  </div>
}