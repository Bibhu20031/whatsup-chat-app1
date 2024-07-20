import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputs.username, inputs.password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-8">
          Login to <span className="text-green-700">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmitForm}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="disabled:opacity-50 px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <Link
              to="/signup"
              className="text-sm text-green-700 hover:underline"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;




