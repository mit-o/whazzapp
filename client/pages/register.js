import Link from "next/link";
import Seo from "../components/Seo";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { register as authRegister } from "../features/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  const dispatch = useDispatch();
  const { registered } = useSelector((state) => state.auth);
  const router = useRouter();

  const yupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(30).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  useEffect(() => {
    if (registered) {
      router.push("/login");
    }
  }, [registered]);

  return (
    <>
      <Seo title={"Login - Whazzapp"} />
      <main className="flex items-center justify-center bg-light">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-4xl font-extrabold text-dark">
                Sign up to Whazzapp!
              </h2>
              <p className="mt-2 font-medium text-center text-md text-dark">
                Enter your details below to create an account.
              </p>
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit((data) => dispatch(authRegister(data)))}
            >
              <div className="rounded flex flex-col gap-3">
                <div className="">
                  <label htmlFor="email" className="text-dark font-semibold">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="relative block w-full rounded-lg border border-gray mt-3 px-3 py-2 text-dark focus:z-10 focus:border-accent focus:outline-none focus:ring-accent sm:text-sm shadow-md"
                    {...register("email")}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-dark font-semibold">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="relative block w-full rounded-lg border border-gray mt-3 px-3 py-2 text-dark  focus:z-10 focus:border-accent focus:outline-none focus:ring-accent sm:text-sm shadow-md"
                    {...register("password")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="text-dark font-semibold"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="relative block w-full rounded-lg border border-gray mt-3 px-3 py-2 text-dark focus:z-10 focus:border-accent focus:outline-none focus:ring-accent sm:text-sm shadow-md"
                    {...register("confirmPassword")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-md">
                  <Link href="/login">
                    <a className="font-semibold text-dark hover:text-accent">
                      Already have an account?
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-lg bg-accent py-2 px-4 text-md font-bold text-light hover:bg-accentplus focus:outline-none focus:ring-2 focus:ring-aquaer focus:ring-offset-2 shadow-md"
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

export default Register;
