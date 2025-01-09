import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your sign-in logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email">Name</label>
              <Input
                id="name"
                name="name"
                type="name"
                required
                placeholder="Enter you name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email address</label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter you email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="confirm-password"
                required
                placeholder="Enter password again"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
