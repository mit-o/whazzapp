import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetRegistered, login } from "../features/authSlice";
import { useRouter } from "next/router";
import Seo from "../components/Seo";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const yupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(30).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(resetRegistered());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Seo title={"Login - Whazzapp"} />
      <main className="flex items-center justify-center bg-light">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-1 rounded-lg h-4/5 w-3/4">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-4xl font-extrabold text-dark">
                Sign in to your account
              </h2>
              <p className="mt-2 font-medium text-center text-md text-dark">
                or{" "}
                <Link href="/register">
                  <a className="text-accent font-semibold">
                    start using Whazzapp right now!
                  </a>
                </Link>
              </p>
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit((data) => dispatch(login(data)))}
            >
              <div className="flex flex-col gap-3">
                <div className="">
                  <label
                    htmlFor="email-address"
                    className="text-dark font-semibold"
                  >
                    Email address
                  </label>
                  <input
                    type="text"
                    className="relative block w-full rounded-lg border border-gray mt-3 p-2.5 text-dark focus:z-10 focus:border-accent focus:outline-none focus:ring-accent sm:text-sm shadow-md"
                    {...register("email")}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-dark font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="relative block w-full rounded-lg border border-gray mt-3 p-2.5 text-dark  focus:z-10 focus:border-accent focus:outline-none focus:ring-accent sm:text-sm shadow-md"
                    {...register("password")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-md">
                  <Link href="#">
                    <a className="font-semibold text-dark">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-lg bg-accent p-2.5 text-md font-bold text-light hover:bg-accentplus focus:outline-none focus:ring-2 focus:ring-accentplus focus:ring-offset-2 shadow-md"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
