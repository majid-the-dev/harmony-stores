import { LoaderIcon } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <LoaderIcon size={40} className="animate-spin text-default" />
    </div>
  );
};

export default LoadingScreen;
