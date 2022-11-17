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
      <main className="flex items-center justify-center bg-primary">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-4xl font-bold text-teal-300">
                Sign in to your account
              </h2>
              <p className="mt-2 font-medium text-center text-md text-stone-100">
                or{" "}
                <Link href="/register">
                  <a className="text-stone-100 hover:text-teal-400 underline">
                    start using Whazzapp right now!
                  </a>
                </Link>
              </p>
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit((data) => dispatch(login(data)))}
            >
              <div className="rounded flex flex-col gap-3">
                <div className="">
                  <label
                    htmlFor="email-address"
                    className="text-stone-100 font-medium"
                  >
                    Email address
                  </label>
                  <input
                    type="text"
                    className="relative block w-full rounded border border-gray-500 mt-3 px-3 py-2 text-gray-900 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    {...register("email")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-stone-100 font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="relative block w-full rounded border border-gray-500 mt-3 px-3 py-2 text-gray-900  focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    {...register("password")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-md">
                  <Link href="#">
                    <a className="font-medium text-stone-100 hover:text-teal-400">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-500 py-2 px-4 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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
