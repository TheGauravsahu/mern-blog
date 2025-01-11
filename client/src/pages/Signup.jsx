import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "@/config/axios";
import { showToast } from "@/config/toastify";
import { setUser } from "@/store/user.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters long."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be atleast 6 characters long."),
    confirmPassword: z
      .string()
      .refine((data) => data.password === formSchema.password, {
        message: "Passwords do not match.",
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/users/signup", values);
      const data = response.data;
      showToast("success", data.message);

      localStorage.setItem("token", data.token);
      dispatch(setUser(data.user));
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      showToast("error", errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] p-5">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md shadow-sm space-y-4">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter you name" />
                      </FormControl>
                      <FormMessage className="font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter you email address"
                        />
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

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password again"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-medium" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="my-8">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-500">
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
