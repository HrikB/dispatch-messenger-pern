import { useState } from "react";
import { Loading } from "..";

const buttonInputStyles = "box-border p-2.5 w-full my-1 rounded";

const inputStyles =
  "focus:outline-none bg-input-bg border-input-border border-2 hover:border-black focus:border-focus text-sm";

const LoginBox = ({ setRegisterModal }: any) => {
  const [logLoading, setLogLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = () => {};

  const setLogDefaults = () => {};
  return (
    <div className="userInteract__container box-border px-4 pt-2 pb-0 bg-secondary h-fit rounded w-96 shadow-md shadow-gray-600">
      <div className="login__container py-2   h-fit">
        <p className="text-sm" /*style={{ color: logEmailError && "red" }}*/>
          EMAIL
          {/* {logEmailError && ` - ${logEmailErrorMessage}`} */}
        </p>
        <form className="" onSubmit={signIn}>
          <input
            // style={{
            //   border: logEmailError && "2px solid red",
            // }}
            type="text"
            className={`${buttonInputStyles} ${inputStyles}`}
            value={email}
            onChange={(e) => {
              setLogDefaults();
              setEmail(e.target.value);
            }}
          />
        </form>

        <p className="text-sm" /*style={{ color: logPasswordError && "red" }}*/>
          PASSWORD
          {/* {logPasswordError && ` - ${logPasswordErrorMessage}`} */}
        </p>
        <form className="" onSubmit={signIn}>
          <input
            // style={{
            //   border: logPasswordError && "2px solid red",
            //   transition: logPasswordError && "0s",
            // }}
            type="password"
            className={`${buttonInputStyles} ${inputStyles}`}
            value={password}
            onChange={(e) => {
              setLogDefaults();
              setPassword(e.target.value);
            }}
          />
        </form>

        <button
          className={`${buttonInputStyles} bg-dispatch mb-8 font-bold hover:bg-[#690169]`}
          onClick={signIn}
        >
          {logLoading ? <Loading /> : <h3>Log In</h3>}
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
