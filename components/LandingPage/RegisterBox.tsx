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
  registerUser(confirm_password: $confirmPassword, 
               password: $password, 
               email: $email, 
               last_name: $lastName, 
               first_name: $firstName)
}`;

const RegisterBox = ({ setRegisterModal }: any) => {
  const [registerResult, register] = useMutation(registerMutation);

  const fieldState = [
    useState("asd"),
    useState("asd"),
    useState("c@gmail.com"),
    useState("aaaaaaa"),
    useState("aaaaaaaa"),
  ];

  const signUp = async () => {
    const res = await register({
      firstName: fieldState[0][0],
      lastName: fieldState[1][0],
      email: fieldState[2][0],
      password: fieldState[3][0],
      confirmPassword: fieldState[4][0],
    });

    console.log(res);

    setRegisterModal(false);
  };

  return (
    <form className="relative w-108 h-fit rounded-md shadow-register bg-secondary box-border px-4 py-2.5">
      {console.log(registerResult)}
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
          <p className="my-0.5 text-sm">{`${field}`}</p>
          <input
            type={field.includes("PASSWORD") ? "password" : "text"}
            className="p-2.5 w-full h-11 outline-none mb-1 rounded bg-input-bg border-input-border border-2"
            onChange={(e) => {
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
        <h3 className="font-bold">Sign Up</h3>
      </button>
    </form>
  );
};

export default RegisterBox;
