import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import useLogin from "../hooks/useLogin";
import { useState } from "react";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, loading } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full p-6 rounded-lg shadow-md bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5"
      >
        <h1 className="text-3xl font-semibold text-center text-yellow-200">
          Login
          <span className="text-green-500">Chat-App</span>
        </h1>
        <div className="text-gray-100">
          <FormControl isRequired>
            <FormLabel className="label p-2 label-text text-gray-100">
              Email address
            </FormLabel>
            <Input
              type="email"
              name="email"
              className="input input-bordered w-full h-10 "
              onChange={handleChange}
              value={formData.email}
            />
          </FormControl>
        </div>
        <div className="text-gray-100">
          <FormControl isRequired>
            <FormLabel className="label p-2 label-text text-gray-100">
              Password
            </FormLabel>
            <Input
              type="password"
              name="password"
              className="input input-bordered w-full h-10"
              onChange={handleChange}
              value={formData.password} 
            />
          </FormControl>
        </div>
        <div>
          <a
            href="/signup"
            className="text-sm hover:underline hover: text-blue-400 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </a>
        </div>
        <div>
          <button className="btn btn-active btn-accent btn-block btn-sm mt-2">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
