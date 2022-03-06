import React, { forwardRef, ForwardedRef, useState } from "react";
import { useMutation } from "urql";
import { Loading } from "../..";
import { useAppDispatch as useDispatch } from "../../../redux";

export interface editInfoProps {
  className: string;
  toUpdate: string;
}

const updateMutation = "";

const EditInfo = forwardRef(({ className, toUpdate }: editInfoProps, ref) => {
  const dispatch = useDispatch();
  const [updatedInfo, setUpdatedInfo] = useState<string>("");

  const [updateResult, update] = useMutation(updateMutation);
  const { fetching } = updateResult;

  const save = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <div
      className={`w-screen h-screen bg-edit-prof-background z-20 left-1/2 translate-x-[-50%] translate-y-[-50%] top-1/2 absolute ${className}`}
    >
      <div
        ref={ref as ForwardedRef<HTMLDivElement>}
        className="rounded-lg w-[31.25rem] h-fit absolute bg-edit-attr-background z-20 mx-auto left-0 right-0 top-1/2 translate-y-[-50%] box-border px-4"
      >
        <h1>{`Change your ${toUpdate}`}</h1>
        <h4>{`Enter a new ${toUpdate} to change it`}</h4>

        <p>{`${toUpdate}`.toUpperCase()}</p>
        <form onSubmit={save}>
          <input
            type="text"
            placeholder={`Enter your new ${toUpdate}`}
            value={updatedInfo}
            onChange={(e) => setUpdatedInfo(e.target.value)}
          />
        </form>

        <div>
          <button onClick={cancel}>Cancel</button>
          <button onClick={save}>{fetching ? <Loading /> : "Save"}</button>
        </div>
      </div>
      EditInfo
    </div>
  );
});

export default EditInfo;
