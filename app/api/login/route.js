import { signIn } from "next-auth/react";

export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      await signIn("credentials", { email, password, redirect: false });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
};
