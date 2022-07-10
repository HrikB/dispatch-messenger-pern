import { useState, useEffect } from "react";

export const useWillMount = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

export default useWillMount;
