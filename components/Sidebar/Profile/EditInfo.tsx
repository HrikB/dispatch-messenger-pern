import React, {
  forwardRef,
  ForwardedRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useMutation } from "urql";
import { Loading } from "../..";
import { useSelectUser } from "../../../hooks";
import {
  useAppDispatch as useDispatch,
  updateUserAction,
} from "../../../redux";

export interface editInfoProps {
  className: string;
  toUpdate: string;
  setIsEditMounted: Dispatch<SetStateAction<boolean>>;
}

const buttonCSS = "my-2.5 mx-1 w-20 h-fit box-border py-1.5 rounded text-sm";

const updateMutation = "";

const EditInfo = forwardRef(
  ({ className, toUpdate, setIsEditMounted }: editInfoProps, ref) => {
    const dispatch = useDispatch();
    const user = useSelectUser();
    const [updatedInfo, setUpdatedInfo] = useState<string>("");

    const [updateResult, update] = useMutation(updateMutation);
    const { fetching } = updateResult;

    const save = (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const id = { id: user.id };
      switch (toUpdate) {
        case "first name":
          dispatch(updateUserAction({ firstName: updatedInfo, ...id }));
          break;
        case "last name":
          dispatch(updateUserAction({ lastName: updatedInfo, ...id }));
          break;
        case "email":
          dispatch(updateUserAction({ email: updatedInfo, ...id }));
      }
      setIsEditMounted(false);
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

          <p className="text-sm">{`${toUpdate}`.toUpperCase()}</p>
          <form onSubmit={save}>
            <input
              className="bg-[#242424] border-2 border-solid border-[#141414] outline-none box-border rounded w-full py-1.5 px-1.5 my-1.5 hover:duration-75 hover:border-black focus:duration-[0s] focus:border-focus text-sm"
              type="text"
              placeholder={`Enter your new ${toUpdate}`}
              value={updatedInfo}
              onChange={(e) => setUpdatedInfo(e.target.value)}
            />
          </form>

          <div className="flex justify-end">
            <button
              className={`${buttonCSS} hover:underline`}
              onClick={() => setIsEditMounted(false)}
            >
              Cancel
            </button>
            <button
              className={`${buttonCSS} bg-save hover:bg-button-hover`}
              onClick={save}
            >
              {fetching ? <Loading /> : "Save"}
            </button>
          </div>
        </div>
        EditInfo
      </div>
    );
  }
);

export default EditInfo;
