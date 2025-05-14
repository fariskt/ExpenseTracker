
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup"

const themes = [
  { id: 1, background: "bg-[#1A1A2E]", color: "text-white", primary: "bg-[#0F3460]" },
  { id: 2, background: "bg-[#461220]", color: "text-white", primary: "bg-[#E94560]" },
  { id: 3, background: "bg-[#192A51]", color: "text-white", primary: "bg-[#967AA1]" },
  { id: 4, background: "bg-[#F7B267]", color: "text-black", primary: "bg-[#F4845F]" },
  { id: 5, background: "bg-[#F25F5C]", color: "text-black", primary: "bg-[#642B36]" },
  { id: 6, background: "bg-[#231F20]", color: "text-white", primary: "bg-[#BB4430]" },
];

const validationSchema = Yup.object({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must match").required("Confirm password is required")
});

export default function Signup() {
    const [theme, setTheme] = useState(themes[0])

   const formik = useFormik({
     initialValues: {
      name: "",
       email: "",
       password: "",
       confirmPassword:""
     },
     validationSchema,
     onSubmit: (values) => {
       register(values);
     },
   });

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.background} ${theme.color} transition-all duration-300`}>
      <div className="relative w-[26rem]">
        <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-current opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-current opacity-20 blur-3xl"></div>

        <div className="relative z-10 p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-xl">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="absolute -top-14 right-0 w-44 opacity-60 -z-10"
          />
          <h1 className="text-2xl font-bold text-center mb-6 opacity-80">SIGN UP</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="FULL NAME"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full p-3 mb-4 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
              {formik.touched.name && formik.errors.name && (
              <div className="text-red-400 text-sm mb-2">{formik.errors.name}</div>
            )}
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full p-3 mb-4 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-400 text-sm mb-2">{formik.errors.email}</div>
            )}
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full p-3 mb-4 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-400 text-sm mb-2">{formik.errors.password}</div>
            )}
            <input
              type="password"
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="w-full p-3 mb-4 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-400 text-sm mb-2">{formik.errors.confirmPassword}</div>
            )}
            <button
              type="submit"
              className={`w-full py-3 rounded-md font-bold tracking-wide ${theme.primary} ${theme.color} hover:scale-105 transition-transform`}
            >
              REGISTER
            </button>
            <div className="flex items-center justify-around">
              <div className="w-24 h-[1px] bg-gray-500 "></div>
              <h4 className="text-center my-3">or</h4>
              <div className="w-24 h-[1px] bg-gray-500"></div>
            </div>
            <button
              type="button"
              className="w-full py-2 mb-4 flex items-center justify-center gap-2 rounded-md bg-white/80 text-black font-semibold hover:bg-white transition-all"
              onClick={() => alert("Handle Google login")}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
          </form>
          <div className="flex justify-between text-sm mt-4 opacity-60">
            <Link to="/login">LOGIN</Link>
            <a href="#">FORGOT PASSWORD</a>
          </div>
        </div>

        {/* Theme Buttons */}
      </div>
         <div className="absolute top-10 right-5 flex gap-2">
        {themes.map((t, i) => (
          <buttonm
            key={i}
            className={`w-6 h-6 rounded-full ${t.background} ${t.id === theme.id ? "border" : ""}`}
            onClick={() => setTheme(t)}
            title={`Theme ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
