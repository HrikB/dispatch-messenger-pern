import Image from "next/image";

export const AppInfo = () => {
  return (
    <div className="flex w-fit mr-60 items-center">
      <div className="mr-4">
        <Image height="100" width="100" src="/DispatchLogo.svg" alt="Logo" />
      </div>
      <h1 className="h-fit font-[Arial] font-black mr-4 text-7xl">Dispatch</h1>
    </div>
  );
};

export default AppInfo;
