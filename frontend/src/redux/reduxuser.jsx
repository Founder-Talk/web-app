import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  selectUserStatus,
  selectUserToken,
} from "./slice/userslice";

function AppInitializer() {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const token = useSelector(selectUserToken);

  useEffect(() => {
    if (token && status === "idle") {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, status]);

  return null;
}

export default AppInitializer;
