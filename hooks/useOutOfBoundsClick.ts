import { useState, useEffect, MutableRefObject } from "react";

const useOutOfBoundsClick = (ref: MutableRefObject<any>) => {
  const [outside, setOutside] = useState<boolean>(false);
  console.log("inside", ref);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (!ref.current) return setOutside(false);

    if (!ref.current.contains(e.target)) setOutside(true);
    else setOutside(false);
  };

  return outside;
};

export default useOutOfBoundsClick;
