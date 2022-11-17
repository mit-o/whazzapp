import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const LoginForwarder = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
};

const RequireAuth = (Component) => {
  const ProtectedComponent = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return !!isAuthenticated ? <Component /> : <LoginForwarder />;
  };

  return ProtectedComponent;
};

export default RequireAuth;
