export interface User {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePic?: string;
  friendsList?: string[];
  __typename?: string; //graphql
}

export default User;
