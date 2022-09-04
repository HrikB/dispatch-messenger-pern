import React, { useEffect, useState } from "react";
import Loading from "../Loading";

function All() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await new Promise((res) => setTimeout(res, 4000));
      setLoading(false);
    })();
  }, []);
  return (
    <div className={`flex justify-center items-center h-full`}>
      {loading ? <Loading /> : `All`}
    </div>
  );
}

export default All;
