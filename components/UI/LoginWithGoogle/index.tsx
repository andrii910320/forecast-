"use client";
import { FC } from "react";
// import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { AppRouters } from "@/utils/constant";
interface LoginWithGoogleProps {}

const LoginWithGoogle: FC<LoginWithGoogleProps> = () => {
  const { push } = useRouter();
  return (
    <div>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          push(AppRouters.FORECAST);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */}
    </div>
  );
};

export default LoginWithGoogle;
