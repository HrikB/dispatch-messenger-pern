import { useAppSelector } from "../redux";

export const useSelectUser = () => {
  const user = useAppSelector((state) => state.userReducer.user);

  return user;
};

export default useSelectUser;
