/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import CustomModal from "@/components/CustomModal";
import { useRouter } from "next/router";
import { UserMovie } from "@/types";

const Auth = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setFormData({ email: "", password: "", fullname: "" });
    setErrors({ email: "", password: "", fullname: "" });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "", fullname: "" };
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!isLoginView && !formData.fullname) {
      newErrors.fullname = "Full name is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      try {
        let response;
        if (isLoginView) {
          response = await axios.post("/api/login", {
            email: formData.email,
            password: formData.password,
          });
          setIsSuccess(true);
          setModalMessage("Login successful");
          const user = response.data.user;
          localStorage.setItem(
            "user",
            JSON.stringify({ email: formData.email, userId: user.id })
          );
        } else {
          response = await axios.post("/api/register", {
            fullname: formData.fullname,
            email: formData.email,
            password: formData.password,
            isMale: null,
            yearOfBirth: null,
            imageUrl: null,
            wishList: [] as UserMovie[],
          });
          setIsSuccess(true);
          setModalMessage("Registration successful");
          const user = response.data.user;
          localStorage.setItem(
            "user",
            JSON.stringify({
              fullname: formData.fullname,
              email: formData.email,
              userId: user.id,
            })
          );
        }
        setOpenModal(true);
        router.push("/");
      } catch (error: any) {
        setIsSuccess(false);
        if (error.response) {
          if (error.response.status === 401) {
            setErrors({ ...errors, email: "Invalid email or password" });
            setModalMessage("Invalid email or password");
          } else if (error.response.status === 500) {
            setErrors({ ...errors, email: "User already exists" });
            setModalMessage("User already exists");
          } else {
            setModalMessage("An error occurred");
          }
        } else {
          setModalMessage("An error occurred");
        }
        setOpenModal(true);
      }
    }
  };

  return (
    <section className="h-screen w-screen flex flex-row gap-4 items-center justify-center shadow-xl bg-gray-100 p-4">
      <CustomModal
        open={openModal}
        isSuccess={isSuccess}
        action="Đăng kí tài khoản"
        onClose={handleCloseModal}
        errorMes={modalMessage}
      />
      <div className="w-[70%] h-full bg-black rounded-3xl">
        <div className="absolute flex flex-row gap-2 items-center right-5 top-5">
          <h2 className="text-base font-normal text-black w-[80%] text-center">
            {isLoginView
              ? "Don't have an account?"
              : "Already have an account?"}
          </h2>
          <button
            onClick={toggleView}
            className="text-sm bg-gray-200 text-black font-bold px-3 py-1 rounded-lg"
          >
            {isLoginView ? "Register" : "Login"}
          </button>
        </div>
        <img
          className="w-full h-full object-cover rounded-3xl"
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2659&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
        />
      </div>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-12 flex flex-col items-center justify-center relative">
        <h2 className="text-2xl text-black font-bold mb-2">
          {isLoginView ? "Sign in to " : "Sign up to"}
          <span className="text-rose-700"> Netflex</span>
        </h2>

        <h2 className="text-base text-black font-normal w-[80%] text-center mb-6">
          {isLoginView
            ? "Enjoy your time experiencing the app"
            : "Enter your information to use the app"}
        </h2>
        <form className="w-full">
          {!isLoginView && (
            <div className="mb-2">
              <label
                htmlFor="register-fullname"
                className="block font-bold text-gray-700 mb-2"
              >
                Full name
              </label>
              <input
                type="text"
                id="register-fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg"
              />
              {errors.fullname && (
                <div className="text-red-500">
                  <small>{errors.fullname}</small>
                </div>
              )}
            </div>
          )}
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block font-bold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg"
            />
            {errors.email && (
              <div className="text-red-500">
                <small>{errors.email}</small>
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-bold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg"
            />
            {errors.password && (
              <div className="text-red-500">
                <small>{errors.password}</small>
              </div>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-sky-700 text-white px-4 py-2 font-bold rounded-xl"
          >
            {isLoginView ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
