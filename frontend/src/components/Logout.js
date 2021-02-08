import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { user } from "../reducers/user";

export const Logout = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.login?.userDetails.accessToken)

  const handleLogout = () => {
    dispatch(user.actions.deleteAccessToken());
    dispatch(user.actions.deleteUserId());
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
    { token && <button onClick={handleLogout}>Logout</button> }
    </>
  );
};
