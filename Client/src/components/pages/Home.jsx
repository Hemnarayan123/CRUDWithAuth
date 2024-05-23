import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthToken";

function Home() {


  const { isSignIn, SignoutUser } = useAuth();

  

 
  return (
    <>
  <nav>
    <div className="relative">
      {isSignIn ? (
        <h1
          className="absolute text-2xl font-bold right-0 bottom-20 mr-8 rounded-full p-3 bg-white cursor-pointer"
          onClick={SignoutUser}
        >
          <Link to="/signout">Sign Out</Link>
        </h1>
      ) : (
        <h1
          className="absolute text-2xl font-bold right-0 bottom-20 mr-8 rounded-full p-3 bg-white cursor-pointer"
        >
          <Link to="/signin">Sign In</Link>
        </h1>
      )}
    </div>
  </nav>
      <div>
        <div className=" flex items-center justify-center flex-col mx-80 mt-40">
          <h1 className="text-9xl text-white">Welcome to the Todo Web</h1>
          <p className="text-2xl text-white mt-4">
            This is a simple web application that allows you to create, edit and
            delete tasks. You can also search for specific tasks by name or
            description. The Todo Web uses the React framework. It was built
            using Tailwind CSS as its CSS framework
          </p>
          {isSignIn ? (
        <h1 className="text-2xl font-bold mr-8 rounded-2xl mt-7 p-3 bg-white cursor-pointer"><Link to="/todo">Get Todo</Link></h1>
      ) : (
        <h1 className="text-2xl font-bold mr-8 rounded-2xl mt-7 p-3 bg-white cursor-pointer"><Link to="/signup">Create Todo</Link></h1>
      )}
          
        </div>
      </div>
    </>
  );
}

export default Home;
