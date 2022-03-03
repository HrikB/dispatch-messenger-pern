import { useState } from "react";
import { Loading } from "..";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useMutation } from "urql";

const FIELDS = [
  "FIRST NAME",
  "LAST NAME",
  "EMAIL",
  "PASSWORD",
  "CONFIRM PASSWORD",
];

const registerMutation = `mutation(
  $confirmPassword: String!,
  $password: String!,
  $email: String!,
  $lastName: String!,
  $firstName: String!
) {
  registerUser(
    confirm_password: $confirmPassword, 
    password: $password, 
    email: $email, 
    last_name: $lastName, 
    first_name: $firstName
    )
}`;

const RegisterBox = ({ setRegisterModal }: any) => {
  const [registerResult, register] = useMutation(registerMutation);
  const { fetching } = registerResult;

  const fieldState = FIELDS.map(() => useState<string>(""));

  // const fieldState = [
  //   useState("asd"),
  //   useState("asd"),
  //   useState("c@gmail.com"),
  //   useState("aaaaaaa"),
  //   useState("aaaaaaaa"),
  // ];

  const errorState = FIELDS.map(() => useState<string>(""));

  const signUp = async () => {
    const { error } = await register({
      firstName: fieldState[0][0],
      lastName: fieldState[1][0],
      email: fieldState[2][0],
      password: fieldState[3][0],
      confirmPassword: fieldState[4][0],
    });

    if (error) {
      const details = error.graphQLErrors[0].extensions.exception.details[0];
      const erroredField = details.path[0];
      const errMsg = details.message;

      //clear all messages
      setRegDefaults();

      switch (erroredField) {
        case "firstName":
          errorState[0][1](errMsg);
          break;
        case "lastName":
          errorState[1][1](errMsg);
          break;
        case "email":
          errorState[2][1](errMsg);
          break;
        case "password":
          errorState[3][1](errMsg);
          break;
        case "confirmPassword":
          errorState[4][1](errMsg);
          break;
      }

      return;
    }

    setRegisterModal(false);
  };

  const setRegDefaults = () => {
    errorState.forEach((state) => state[1](""));
  };

  return (
    <form className="relative w-108 h-fit rounded-md shadow-register bg-secondary box-border px-4 py-2.5">
      <div className="absolute right-0">
        <IconButton onClick={() => setRegisterModal(false)}>
          <Close />
        </IconButton>
      </div>

      <h1 className="text-h1 font-bold pb-2.5 mb-2.5 border-b-white border-b ">
        Sign Up
      </h1>

      {FIELDS.map((field, i) => (
        <div key={field}>
          <p
            className={`my-0.5 text-sm ${
              errorState[i][0] !== "" ? "text-red-600" : ""
            }`}
          >
            {field} {errorState[i][0] !== "" ? `- ${errorState[i][0]}` : ""}
          </p>
          <input
            type={field.includes("PASSWORD") ? "password" : "text"}
            className={`p-2.5 w-full h-11 outline-none mb-1 rounded bg-input-bg ${
              errorState[i][0] !== "" ? "border-red-600" : "border-input-border"
            } border-2`}
            onChange={(e) => {
              setRegDefaults();
              return fieldState[i][1](e.target.value);
            }}
            value={fieldState[i][0]}
          />
        </div>
      ))}

      <button
        type="button"
        className="w-1/2 bg-[#008000] hover:bg-[#026802] self-center block my-1 mx-auto box-border p-2.5 rounded"
        onClick={signUp}
      >
        <h3 className="font-bold">{fetching ? <Loading /> : `Sign Up`}</h3>
      </button>
    </form>
  );
};

export default RegisterBox;
