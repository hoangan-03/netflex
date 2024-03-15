import React, { useCallback } from "react";
import back from "./../assets/picture/back.jpg"
import Image from 'next/image';
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
const Auth = () => {
  const [variant, setVariant] = useState("login");

  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [email, setInputText] = useState("");
  const [password, setInputText2] = useState("");
  const [name, setInputText3] = useState("");
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(email === "" ? false : true);
  };
  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(password === "" ? false : true);
  };

  const handleFocus3 = () => {
    setIsFocused3(true);
  };
  const handleBlur3 = () => {
    setIsFocused3(name === "" ? false : true);
  };

  const handleChange3 = (event) => {
    setInputText3(event.target.value);
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };
  const handleChange2 = (event) => {
    setInputText2(event.target.value);
  };
  const changeVariant = (variant) => {
    setVariant(variant);
  };
  const [checked, setChecked] = React.useState(false);
  function handleChangee(e) {
    setChecked(e.target.checked);
  }
  const register = useCallback(async () => {
    try {
      await axios.post("api/register", {
        email,
        name,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  const login = useCallback(async()=> {
    try{
      await signIn('credentials',{
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });
    }catch (error){
      console.log(error);

    }
  },[email,password])
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center netflix">
      <div className="bg-black w-[440px] h-[660px] z-10 p-[60px] flex flex-col gap-3 ">
        <h1 className="text-white text-2xl mb-10 font-bold font-sans">{`${
          variant === "login" ? "Log in" : "Register"
        }`}</h1>

        <div
          className={`relative w-full h-[50px]  ${
            variant == "login" ? "hidden" : "block"
          }`}
        >
          <label
            htmlFor="username"
            className={`absolute  h-auto top-${
              isFocused3 || name !== "" ? "[-1px]" : "3"
            } ${
              isFocused3 ? "text-sm " : "text-lg"
            } left-[10px] text-gray-400 px-2 transition-all duration-100`}
          >
            Username
          </label>
          <input
            id="username"
            className="w-full h-full bg-gray-800 rounded-md text-gray-200 px-5 pt-3 focus:outline-none"
            type="text"
            onFocus={handleFocus3}
            onBlur={handleBlur3}
            onChange={handleChange3}
            value={name}
          />
        </div>

        <div className="relative w-full h-[50px]">
          <label
            htmlFor="username"
            className={`absolute  h-auto top-${
              isFocused || email !== "" ? "[-1px]" : "3"
            } ${
              isFocused ? "text-sm " : "text-lg"
            } left-[10px] text-gray-400 px-2 transition-all duration-100`}
          >
            Email or Phone Number
          </label>
          <input
            id="username"
            className="w-full h-full bg-gray-800 rounded-md text-gray-200 px-5 pt-3 focus:outline-none"
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="relative w-full h-[50px] mb-10">
          <label
            htmlFor="password"
            className={`absolute  h-auto top-${
              isFocused2 || password !== "" ? "[-1px]" : "3"
            } ${
              isFocused2 ? "text-sm " : "text-lg"
            } left-[10px] text-gray-400 px-2 transition-all duration-100`}
          >
            Password
          </label>
          <input
            id="password"
            className="w-full h-full bg-gray-800 rounded-md text-gray-200 px-5 pt-3 focus:outline-none"
            type="password"
            onFocus={handleFocus2}
            onBlur={handleBlur2}
            onChange={handleChange2}
            value={password}
          />
        </div>
        <button
          onClick={variant === "login" ? login : register  }
          to="/Home"
          className="bg-red-700 text-white text-center  text-xl w-full h-[50px] rounded-md flex justify-center items-center hover:text-red-500 hover:bg-white"
        >
          {variant === "login" ? "Login" : "Register"}
        </button>
        <div className="w-full h-[50px] flex flex-row justify-between">
          <div className="w-auto h-auto flex flex-row items-center gap-2">
            <input value="test" type="checkbox" onChange={handleChangee} />
            <div className="text-base text-gray-400 ">Remember me</div>
          </div>
        </div>
        <div className="w-full h-[50px] text-xl text-gray-400">
          {`${
            variant === "login"
              ? "You are new to Netflix?"
              : "Already have an account?"
          }`}
          <span
            className="text-white hover:underline cursor-pointer"
            onClick={
              variant === "login"
                ? () => changeVariant("signup")
                : () => changeVariant("login")
            }
          >
            {`${variant === "login" ? "Sign up now" : "Login"}`}
          </span>{" "}
        </div>
      </div>

      <Image
        className="absolute top-0 left-0 object-cover z-0 w-full h-full"
        alt=""
        src={back}
      />
    </div>
  );
};

export default Auth;
