"use client";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Separator from "../ui/Separator";
import Checkbox from "../ui/Checkbox";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      if (res.ok) {
        setIsError(false);
        setMessage("Login successful!");
        setTimeout(() => {
          router.push("/Dashboard");
        }, 1000);
      } else {
        setIsError(true);
        setMessage(data.message || "Login failed.");
      }
    } catch {
      setIsError(true);
      setMessage("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="w-full h-full">
      <div
        className="
          flex items-center justify-center w-full h-full
          bg-[url(https://c.animaapp.com/md3i41oxgVsZYm/img/31-list-of-wallpaper-computer-light-blue-1.png)]
          bg-cover bg-center
          px-4 md:px-8 lg:px-12
        "
      >
        <Card
          className="
            flex flex-col md:flex-row flex-wrap  
            w-full max-w-[960px] bg-white rounded-[28px] shadow-lg overflow-hidden
          "
        >
          <div
            className="
              flex flex-col justify-center items-center md:items-start
              text-center md:text-left
              font-bold text-3xl md:text-4xl
              text-black
              w-full md:w-auto md:max-w-[300px]  
              p-8 md:p-12
            "
          >
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

          <div className="flex flex-col w-full max-w-[350px] gap-5 p-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-black">
              Welcome Back
            </h2>
            <p className="text-[#292c31cc] text-base md:text-lg">
              Enter your credentials to login to taskify.
            </p>

            <div className="flex flex-col w-full gap-4">
              <Input
                className="w-full px-4 py-3 bg-[#f9f9f9] rounded-[10px] border border-[#d1d1d1] block sm:hidden"
                placeholder="Phone number, username or email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                className="w-full px-4 py-3 bg-[#f9f9f9] rounded-[10px] text-black border border-[#d1d1d1] hidden sm:block"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                className="w-full px-4 py-3 bg-[#f9f9f9] text-black rounded-[10px] border border-[#d1d1d1]"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

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
              className="h-12 w-full bg-[#ec4c7d] hover:bg-[#d43e6b] rounded-lg text-white text-lg font-semibold"
              onClick={handleLogin}
            >
              Log In
            </Button>

            {message && (
              <p
                className={`text-center ${
                  isError ? "text-red-500" : "text-green-500"
                } text-sm`}
              >
                {message}
              </p>
            )}

            <p className="text-center text-black text-sm md:text-base">
              Don’t have an account?{" "}
              <Button
                variant="link"
                className="p-0 font-semibold text-[#292c31] underline"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
