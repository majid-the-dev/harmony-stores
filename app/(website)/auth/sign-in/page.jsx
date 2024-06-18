import AuthForm from "@/components/AuthForm";

const Page = () => {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
        <p className="text-gray-500 text-xs font-medium mb-1">ENTER YOUR DETAILS TO SIGN IN</p>
        <h1 className="text-[17px] md:text-2xl font-bold">Welcome to Harmony Stores NG</h1>
        <div className="h-1.5 w-5 gradient-bg rounded-full mt-1"></div>
        <div className="mt-10">
          <AuthForm type="sign-in" />
        </div>
    </main>
  )
}

export default Page