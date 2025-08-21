import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGooglePopup } from "../config/firebase";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });

    setEmail("");
    setPassword("");
  };

  const logGoogleUser = () => {
    signInWithGooglePopup()
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-1/2 px-10 py-5 bg-zinc-800 rounded-xl flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">Login User</h1>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-2 rounded-md outline-0 text-lg border border-zinc-400"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Your Password"
            className="w-full px-4 py-2 rounded-md outline-0 text-lg border border-zinc-400"
          />
          <button className="px-4 py-2 rounded-md text-lg border-none outline-0 bg-blue-500 cursor-pointer">
            Sign In
          </button>
        </form>
        <p className="text-sm text-center">
          Don't have an account ?{" "}
          <Link to="/signup" className="text-blue-500 font-medium">
            Sign Up
          </Link>
        </p>
        <button
          onClick={logGoogleUser}
          className="px-4 py-2 rounded-md text-lg border-none outline-0 bg-red-500 cursor-pointer"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
