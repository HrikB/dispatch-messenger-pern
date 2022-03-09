import { User } from "../../types";

export type State = {
  user: User | null;
  fetching: boolean;
  error: string | null;
};

export default State;
