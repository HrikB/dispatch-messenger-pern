import { useState } from "react";
// import DispatchLogo from "../../public/DispatchLogo";
import { Loading } from ".";

const LoginBox = () => {
  const [logLoading, setLogLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = () => {};

  const setLogDefaults = () => {};
  return (
    <div className="login h-full bg-background flex flex-row justify-center align-center w-fit">
      <div className="app__info flex w-fit mr-80">
        {/* <img src={DispatchLogo} alt="Logo" /> */}
        <h1 className="font-black mr-4 text-6xl">Dispatch</h1>
      </div>
      <div className="userInteract__container">
        <div className="login__container">
          <p /*style={{ color: logEmailError && "red" }}*/>
            EMAIL
            {/* {logEmailError && ` - ${logEmailErrorMessage}`} */}
          </p>
          <form onSubmit={signIn}>
            <input
              // style={{
              //   border: logEmailError && "2px solid red",
              // }}
              type="text"
              className="username"
              value={email}
              onChange={(e) => {
                setLogDefaults();
                setEmail(e.target.value);
              }}
            />
          </form>

          <p /*style={{ color: logPasswordError && "red" }}*/>
            PASSWORD
            {/* {logPasswordError && ` - ${logPasswordErrorMessage}`} */}
          </p>
          <form onSubmit={signIn}>
            <input
              // style={{
              //   border: logPasswordError && "2px solid red",
              //   transition: logPasswordError && "0s",
              // }}
              type="password"
              className="password"
              value={password}
              onChange={(e) => {
                setLogDefaults();
                setPassword(e.target.value);
              }}
            />
          </form>

          <button className="login__button" onClick={signIn}>
            {logLoading ? <Loading /> : <h3>Log In</h3>}
          </button>
          {/* <h5
              className="error__message"
              style={{ visibility: `${errVisibility}` }}
            >
              {errorMessage}
            </h5> */}
        </div>
        <div className="register__container">
          <button className="createNew__account">
            <h3>Create New Account</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
