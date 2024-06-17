"use client"

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

const page = () => {

    const {data} = useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn('credentials', {email, password, callbackUrl: "/admin"});
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type='submit'>login</button> {data?.user?.name}
    </form>
  )
}

export default page