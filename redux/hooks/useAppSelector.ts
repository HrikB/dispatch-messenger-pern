import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../reducer";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
