import {
  removeUserAction,
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../redux";
import { updateUserRequestAction } from "../redux";
import { User } from "../types";

export const useUser = (): [User, (changes: User | null) => Promise<any>] => {
  const dispatch = useDispatch();
  const user: User = useSelector((state) => state.userReducer.user);

  const updateUser = (changes: User | null) =>
    changes === null
      ? dispatch(removeUserAction())
      : dispatch(updateUserRequestAction({ ...changes }));

  return [user, updateUser];
};

export default useUser;
