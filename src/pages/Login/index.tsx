import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate                                        } from "react-router-dom";
import { login                                              } from "../../auth/login";
import { logout                                             } from "../../auth/logout";


interface Credentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState<Credentials>({} as Credentials);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error] = useState(sessionStorage.getItem("authError"));

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    logout();

    return () => {
      sessionStorage.removeItem("authError");
    };
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoggingIn(true);

    login(input).then(() => {
      navigate("/");

      setIsLoggingIn(false);
    });
  };


  return (
    <div>
      <section className="min-h-screen flex items-stretch text-white ">
        <div
          className={`lg:flex w-1/2 hidden bg-gray-800 bg-no-repeat bg-cover relative items-center`}
          style={{ backgroundImage: `url('/img/bg-login.jpg')` }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Time To Work
            </h1>
            <p className="text-3xl my-4">
              Time flies over us, but leaves its shadow behind.
            </p>
          </div>
          <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4"></div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-gray-800">
          <div
            className={`absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center`}
            style={{ backgroundImage: `url('/img/bg-login.jpg')` }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <h1 className="text-gray-100 text-5xl font-extralight">
                Please Login
            </h1>

            {error && (
              <p className="text-white p-4 rounded-lg mt-4">
                {error}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              <div className="pb-2 pt-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={handlerChange}
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                />
              </div>
              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handlerChange}
                />
              </div>
              <div className="px-4 pb-2 pt-4">
                <button
                  className={
                    `uppercase block w-full p-4 text-lg rounded-full focus:outline-none ${isLoggingIn
                      ? "bg-gray-500"
                      : "bg-indigo-500 hover:bg-indigo-600"
                    }`
                  }
                  type="submit"
                  disabled={isLoggingIn}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
