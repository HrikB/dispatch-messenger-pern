export interface User {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePic?: string;
  friendsList?: string[];
  __typename?: string; //graphql
}

export default User;
