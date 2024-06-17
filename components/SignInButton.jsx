import { signIn as signInClient } from "next-auth/react"

const SignInButton = ({ email, password }) => {

    const signIn = async (email, password) => {
        await signInClient('credentials', {
            email,
            password,
            redirect: false,
        });
    };

  return (
    <button onClick={() => signIn(email, password)}>
        Sign In
    </button>
  )
}

export default SignInButton