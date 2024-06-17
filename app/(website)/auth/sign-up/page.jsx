import AuthForm from "@/components/AuthForm";

const page = () => {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-gray-500 text-xs font-medium mb-1">
        ENTER YOUR DETAILS TO SIGN UP
      </p>
      <h1 className="text-lg md:text-2xl font-semibold">Welcome to Harmony Stores NG</h1>
      <div className="h-1.5 w-9 gradient-bg rounded-full mt-1"></div>

      <div className="mt-10">
        <AuthForm type="sign-up" />
      </div>
    </div>
  );
};

export default page;
