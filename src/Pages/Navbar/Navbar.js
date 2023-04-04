import React from "react";
import { useContext } from "react";
import { Context } from "../../Context/ContextProvider";

const Navbar = () => {
  const { google, user } = useContext(Context);
  console.log(user?.email);
  const googleHandler = () => {
    google()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch(console.error());
  };
  return (
    <div>
      <div className="navbar bg-base-300 justify-between">
        <a className="btn btn-ghost normal-case text-xl">Ooloi Lab </a>
        <div>
          <button onClick={googleHandler} className="btn-secondary btn">
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
