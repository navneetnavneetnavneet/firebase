import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        navigate("/");
      }
    });
  }, []);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin");

        console.log("User sign out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center">
      <button
        onClick={signOutHandler}
        className="px-4 py-2 rounded-md text-lg outline-0 border-none bg-red-500 cursor-pointer"
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
