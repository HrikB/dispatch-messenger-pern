import { useAppSelector as useSelector } from "../redux";

export const useUpdateUser = () => {
  const { user, updating, error } = useSelector((state) => state.userReducer);
  return [user, updating, error];
};

export default useUpdateUser;
