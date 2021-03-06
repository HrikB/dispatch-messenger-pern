import {
  forwardRef,
  ForwardedRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Loading from "../../Loading";
import { useUser } from "../../../hooks";
import { useAppDispatch as useDispatch } from "../../../redux";
import { ErrorResponse } from "../../../types";

export interface editInfoProps {
  className: string;
  toUpdate: string;
  setIsEditMounted: Dispatch<SetStateAction<boolean>>;
}

const buttonCSS = "my-2.5 mx-1 w-20 h-fit box-border py-1.5 rounded text-sm";

const EditInfo = forwardRef(
  ({ className, toUpdate, setIsEditMounted }: editInfoProps, ref) => {
    const dispatch = useDispatch();

    const [user, updateUser] = useUser();
    const [updating, setUpdating] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [updatedInfo, setUpdatedInfo] = useState<string>("");

    const saveSuccess = () => {
      setUpdating(false);
      setError("");
      setIsEditMounted(false);
    };

    const saveError = (err: unknown) => {
      setUpdating(false);
      setError((err as ErrorResponse).errorDetails);
    };

    const save = (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      if (updatedInfo.length === 0) return;
      const id = { id: user.id };

      setUpdating(true);
      switch (toUpdate) {
        case "first name":
          updateUser({ firstName: updatedInfo, ...id })
            .then(saveSuccess)
            .catch(saveError);
          break;
        case "last name":
          updateUser({ lastName: updatedInfo, ...id })
            .then(saveSuccess)
            .catch(saveError);
          break;
        case "email":
          updateUser({ email: updatedInfo, ...id })
            .then(saveSuccess)
            .catch(saveError);
      }
    };

    return (
      <div
        className={`w-screen h-screen bg-edit-prof-background z-20 left-1/2 translate-x-[-50%] translate-y-[-50%] top-1/2 absolute ${className}`}
      >
        <div
          ref={ref as ForwardedRef<HTMLDivElement>}
          className="rounded-lg w-[31.25rem] h-fit absolute bg-edit-attr-background z-20 mx-auto left-0 right-0 top-1/2 translate-y-[-50%] box-border px-4"
        >
          <h1 className="text-3xl text-center font-extrabold m-2.5">{`Change your ${toUpdate}`}</h1>
          <h4 className="text-center font-medium m-2.5">{`Enter a new ${toUpdate} to change it`}</h4>

          <p className={`text-sm ${error !== "" ? "text-error" : ""}`}>
            {`${toUpdate}`.toUpperCase()} {error !== "" && `- ${error}`}
          </p>
          <form onSubmit={save}>
            <input
              className={`bg-[#242424] border-2 border-solid  
                ${
                  error !== ""
                    ? "border-error"
                    : "border-input-border hover:border-black focus:duration-[0s] focus:border-focus"
                }
              outline-none box-border rounded w-full py-1.5 px-1.5 my-1.5 hover:duration-75   text-sm`}
              type="text"
              placeholder={`Enter your new ${toUpdate}`}
              value={updatedInfo}
              onChange={(e) => {
                error !== "" && setError("");
                setUpdatedInfo(e.target.value);
              }}
            />
          </form>

          <div className="flex justify-end">
            <button
              className={`${buttonCSS} hover:underline`}
              onClick={() => {
                setError("");
                setIsEditMounted(false);
              }}
            >
              Cancel
            </button>
            <button
              className={`${buttonCSS} bg-save hover:bg-button-hover disabled:bg-disabled`}
              onClick={save}
              disabled={updatedInfo.length === 0}
            >
              {updating ? <Loading /> : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);
EditInfo.displayName = "EditInfo";

export default EditInfo;
