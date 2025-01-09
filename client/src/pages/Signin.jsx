import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import axios from "@/config/axios";
import { showToast } from "@/config/toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/user.slice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be 6 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/users/login", values);
      const data = response.data;
      showToast("success", data.message);

      dispath(setUser(data.user));
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      showToast("error", errorMessage);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] p-5 h-">
        <div className="my-8">
          <div className="flex items-center justify-center mb-1">
            <Link to="/" className="text-center text-xl">
              MERN blogs
            </Link>
          </div>
          <h2 className="text-center text-3xl font-semibold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmitclassName="mt-8 space-y-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter you email address" />
                    </FormControl>
                    <FormMessage className="font-medium" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-medium" />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-8">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>

            <div>
              <p className="text-sm text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
