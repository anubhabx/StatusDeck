import AuthForm from "@/components/auth-form";
import Loader from "@/components/Loader";
import React, { Suspense } from "react";

const SignInPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AuthForm formType="signin" />;
    </Suspense>
  );
};

export default SignInPage;
