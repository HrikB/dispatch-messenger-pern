import {
  useRef,
  useState,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import AvatarEditor from "react-avatar-editor";
import { Photo } from "@mui/icons-material";
import { Slider } from "@mui/material";
import Loading from "../../Loading";
import { useQuery } from "urql";
import axios from "axios";
import { log } from "console";

interface PreviewImageProps {
  image: string;
  setPreviewImage: Dispatch<SetStateAction<boolean>>;
}

const buttonCSS = "my-2.5 mx-1 w-20 h-fit box-border py-1.5 rounded text-sm";

const signedWriteURLQuery = `query {
  getSignedURL
}`;

function PreviewImage({ image, setPreviewImage }: PreviewImageProps) {
  const editor = useRef<AvatarEditor>();
  const [zoom, setZoom] = useState<number>();
  const [updating, setUpdating] = useState<boolean>(false);

  const [{ data, error }] = useQuery<{ getSignedURL: string }>({
    query: signedWriteURLQuery,
  });

  console.log(data);
  if (error) console.error(error);

  const upload = async () => {
    setUpdating(true);
    if (!editor || !editor.current) return setUpdating(false);
    console.log("editor");

    const canvas: HTMLCanvasElement = editor.current.getImageScaledToCanvas();
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve)
    );
    if (blob === null) return setUpdating(false);
    console.log("blob");
    const formdata = new FormData();
    formdata.append("photo", blob);

    if (!data) return setUpdating(false);
    console.log("data");

    const signedWriteURL = data.getSignedURL;
    console.log(signedWriteURL);

    try {
      const res = await axios.put(signedWriteURL, blob, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
    } catch (err) {}

    setUpdating(false);
    setPreviewImage(false);
  };

  return (
    <div className="table-row box-border max-h-[50vh]">
      <AvatarEditor
        className="my-2.5 mx-auto max-h-4/5 bg-edit-picture-background rounded-md"
        ref={editor as MutableRefObject<AvatarEditor>}
        image={image}
        height={250}
        width={250}
        color={[255, 255, 255, 0.3]}
        scale={zoom}
        border={[90, 20]}
        borderRadius={125}
        rotate={0}
      />
      <div className="flex items-center justify-around relative w-4/5 left-1/2 translate-x-[-50%]">
        <Photo className="scale-75" />
        <Slider
          className="my-1.5 mx-5 w-3/4"
          onChange={(e, val) => {
            if (Array.isArray(val)) return;
            setZoom(val);
          }}
          min={0.5}
          max={5}
          defaultValue={0.5}
          step={0.1}
        />
        <Photo className="scale-[1.8]" />
      </div>

      <div className="flex justify-end">
        <button
          className={`${buttonCSS} hover:underline`}
          onClick={() => setPreviewImage(false)}
        >
          Cancel
        </button>
        <button
          className={`${buttonCSS} bg-save hover:bg-button-hover disabled:bg-disabled`}
          onClick={upload}
        >
          {updating ? <Loading /> : "Save"}
        </button>
      </div>
    </div>
  );
}

export default PreviewImage;
