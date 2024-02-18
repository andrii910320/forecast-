"use client";
import LoginWithGoogle from "@/components/UI/LoginWithGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";
import s from "./style.module.scss";

export default function Login() {
  return (
    <main className={s.mainPage}>
      <h1 className={s.title}> FORECAST</h1>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
        <LoginWithGoogle />
      </GoogleOAuthProvider>
    </main>
  );
}
