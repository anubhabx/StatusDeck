import AuthForm from "@/components/auth-form";
import Loader from "@/components/Loader";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthForm formType="signup" />;
    </Suspense>
  );
}
