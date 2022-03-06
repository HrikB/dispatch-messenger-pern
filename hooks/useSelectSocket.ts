import { useAppSelector as useSelector } from "../redux";

const useSelectSocket = () =>
  useSelector((state) => state.socketReducer.socket);

export default useSelectSocket;
