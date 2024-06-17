import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/components/Unauthorized";
import { getServerSession } from "next-auth";

const AdminMiddleware = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return <Unauthorized />
  }

  //   useEffect(() => {
  //     if (status === "loading") return; // Do nothing while loading

  //     if (!session) {
  //       // If no session exists, redirect to login
  //       signIn();
  //     } else if (session.user.role !== "admin") {
  //       // If user is not an admin, redirect to home or show an error
  //       router.replace("/");
  //     } else {
  //       setIsLoading(false); // Stop loading once session is verified
  //     }
  //   }, [session, status, router]);

  //   if (isLoading) {
  //     return <div>Loading...</div>; // Show a loading spinner or a placeholder while checking the session
  //   }

  return <>{children}</>;
};

export default AdminMiddleware;
