import { useAppSelector } from "../redux";

export const useSelectUser = () =>
  useAppSelector((state) => state.userReducer.user);

export default useSelectUser;
