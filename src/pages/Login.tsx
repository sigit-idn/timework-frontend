import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgLogin from "../bg-login.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  useEffect(() => localStorage.clear(), []);

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSigningIn(true);

    await fetch(process.env.REACT_APP_API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(input),
    })
      .then(async (res) => {
        const { data } = await res.json();

        for (let key in data) {
          localStorage.setItem(key, data[key]);
        }

        navigate("/");
      })
      .catch((err) => console.error(err))
      .finally(() => setIsSigningIn(false));
  };

  return (
    <div>
      <section className="min-h-screen flex items-stretch text-white ">
        <div
          className={`lg:flex w-1/2 hidden bg-gray-800 bg-no-repeat bg-cover relative items-center [background-image:url('${bgLogin}')]`}
          style={{ backgroundImage: `url(${bgLogin})` }}
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
            className={`absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center [background-image:url(${bgLogin})]`}
            style={{ backgroundImage: `url(${bgLogin})` }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <h1 className="my-6">
              <p className="text-gray-100 text-5xl font-extralight">
                Please Login
              </p>
            </h1>

            <form
              onSubmit={handlerSubmit}
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
                    `uppercase block w-full p-4 text-lg rounded-full focus:outline-none ${isSigningIn ? "bg-gray-500" : "bg-indigo-500 hover:bg-indigo-600"}`
                  }
                  type="submit"
                  disabled={isSigningIn}
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
