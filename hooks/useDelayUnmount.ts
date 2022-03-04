import { useState, useEffect } from "react";

const useDelayUnmount = (isMounted: boolean, delay: number): boolean => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isMounted && !show) setShow(true);
    else if (!isMounted && show)
      timeout = setTimeout(() => setShow(false), delay);

    return () => clearTimeout(timeout);
  }, [isMounted, delay, show]);

  return show;
};

export default useDelayUnmount;
