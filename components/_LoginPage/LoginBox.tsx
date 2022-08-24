import React, { useState } from "react";
import { Loading } from "..";
import { useMutation } from "urql";
import { User } from "../../types";
import { useAppDispatch, setUserAction } from "../../redux";
import { useRouter } from "next/router";

const buttonInputStyles = "box-border p-2.5 w-full my-1 rounded";

const inputStyles =
  "focus:outline-none bg-input-bg border-input-border border-2 focus:border-focus text-sm";

const FIELDS = ["EMAIL", "PASSWORD"];

const loginMutation = `mutation(
  $email: String!,
  $password: String!
) {
  loginUser(
    email: $email,
    password: $password
  ) {
    id
    createdAt
    updatedAt
    lastName
    firstName
    email
    profilePic
    friendsList
  }
}`;

const LoginBox = ({ setRegisterModal }: any) => {
  const [loginResult, login] = useMutation(loginMutation);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const fieldState = FIELDS.map(() => useState<string>(""));
  const errorState = FIELDS.map(() => useState<string>(""));

  const signIn = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSigningIn(true);
    const obj = await login({
      email: fieldState[0][0],
      password: fieldState[1][0],
    });
    const { data, error } = obj;

    if (error) {
      console.log(error);
      const details = error.graphQLErrors[0].extensions.exception.details[0];
      const erroredField = details.path[0];
      const errMsg = details.message;

      //clear all messages
      setLogDefaults();

      switch (erroredField) {
        case "email":
          errorState[0][1](errMsg);
          break;
        case "password":
          errorState[1][1](errMsg);
          break;
      }
      setSigningIn(false);
      return;
    }

    const user: User = data.loginUser;
    dispatch(setUserAction(user));
    router.push("/friends");
  };

  const setLogDefaults = () => {
    errorState.forEach((state) => state[1](""));
  };

  return (
    <div className="userInteract__container box-border px-4 pt-2 pb-0 bg-secondary h-fit rounded w-96 shadow-md shadow-gray-600">
      <div className="login__container py-2 h-fit">
        {FIELDS.map((field, i) => (
          <div key={field}>
            <p
              className={`text-sm ${
                errorState[i][0] !== "" ? "text-error" : ""
              }`}
            >
              {field} {errorState[i][0] !== "" ? `- ${errorState[i][0]}` : ""}
            </p>
            <form className="" onSubmit={signIn}>
              <input
                type={field.includes("PASSWORD") ? "password" : "text"}
                className={`${buttonInputStyles} ${inputStyles} ${
                  errorState[i][0] !== ""
                    ? "border-error"
                    : "border-input-border"
                } `}
                value={fieldState[i][0]}
                onChange={(e) => {
                  setLogDefaults();
                  fieldState[i][1](e.target.value);
                }}
              />
            </form>
          </div>
        ))}

        <button
          className={`${buttonInputStyles} bg-dispatch mb-8 font-bold hover:bg-[#690169]`}
          onClick={signIn}
        >
          {signingIn ? <Loading /> : <h3>Log In</h3>}
        </button>
        {/* <h5
              className="error__message"
              style={{ visibility: `${errVisibility}` }}
            >
              {errorMessage}
            </h5> */}
      </div>
      <div className="register__container border-t border-solid border-white flex flex-col justify-center items-center h-2/6">
        <button
          onClick={() => setRegisterModal(true)}
          className={`createNew__account ${buttonInputStyles} bg-[#008000] hover:bg-[#026802] w-4/6 mt-6 mb-4 font-bold`}
        >
          <h3>Create New Account</h3>
        </button>
      </div>
    </div>
  );
};

export default LoginBox;
