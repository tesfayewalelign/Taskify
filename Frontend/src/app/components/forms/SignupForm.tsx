"use client";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Separator from "../ui/Separator";
import Checkbox from "../ui/Checkbox";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [isError] = useState(false);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Signup successful!");
        setTimeout(() => router.push("/Dashboard"), 1000);
      } else {
        if (data.errors) {
          const firstField = Object.keys(data.errors)[0];
          const firstErrorMessage = data.errors[firstField][0];
          setMessage(firstErrorMessage || "Signup failed.");
        } else {
          setMessage(data.message || "Signup failed.");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Network error");
    }
  };

  return (
    <div className="w-full h-full">
      <div
        className="
        flex justify-center items-center h-full  w-full
        bg-[url(https://c.animaapp.com/md3i41oxgVsZYm/img/31-list-of-wallpaper-computer-light-blue-1.png)]
        bg-cover bg-center
        px-4 md:px-8 lg:px-12
      "
      >
        <Card className="flex flex-col md:flex-row w-full max-w-[960px] bg-white rounded-[28px] shadow-lg overflow-hidden">
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left font-bold text-3xl md:text-4xl text-black w-full md:w-auto md:max-w-[300px] p-8 md:p-12">
            Taskify
          </div>

          <Separator
            orientation="vertical"
            className="hidden md:flex self-stretch w-px bg-gray-300"
          />
          <Separator
            orientation="horizontal"
            className="flex md:hidden h-px w-full bg-gray-300"
          />

          <div className="flex flex-col justify-center w-full md:w-auto md:max-w-[420px] p-8 md:p-12 gap-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-black">
              Welcome
            </h2>
            <p className="text-[#292c31cc] text-base md:text-lg">
              Enter your info to get started with taskify.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full max-w-full"
            >
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#f9f9f9] text-black rounded-lg border border-[#d1d1d1]"
                placeholder="Name"
                type="text"
              />
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#f9f9f9]  text-black rounded-lg border border-[#d1d1d1]"
                placeholder="Email"
                type="email"
              />
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#f9f9f9]  text-black rounded-lg border border-[#d1d1d1]"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
              <Input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#f9f9f9]  text-black rounded-lg border border-[#d1d1d1]"
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
              />

              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-password"
                  checked={showPassword}
                  onCheckedChange={(checked) => setShowPassword(!!checked)}
                  className="w-5 h-5"
                />
                <label
                  htmlFor="show-password"
                  className="cursor-pointer text-black text-sm"
                >
                  Show password
                </label>
              </div>
              <Button
                type="submit"
                className="h-14 w-full bg-[#ec4c7d] hover:bg-[#d43e6b] rounded-lg text-white text-xl font-semibold"
              >
                Sign Up
              </Button>
              {message && (
                <p
                  className={`text-center ${
                    isError ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>

            <p className="text-center text-black text-sm md:text-base">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 font-semibold text-[#292c31] underline"
                onClick={() => router.push("/login")}
              >
                Log In
              </Button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
