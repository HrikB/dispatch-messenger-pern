import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../redux";
import { updateUserRequest } from "../redux/actions/userActions";
import { User } from "../types";
import { useCallback } from "react";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const updateUser = useCallback((changes: User) => {
    dispatch(updateUserRequest({ ...changes }));
  }, []);
  return [user, updateUser];
};

export default useUser;
