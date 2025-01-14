import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/config/toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarFallback } from "@radix-ui/react-avatar";
import axios from "../config/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/user.slice";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters long."),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be atleast 3 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      const response = await axios.patch(`/users/${userData._id}`, formData);
      const data = await response.data;

      dispatch(setUser(data.user));
      showToast("success", data.message);
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user profile.";
      showToast("error", errorMessage);
    }
  };

  const getUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users/profile");
      const user = response.data.user;
      setUserData(user);
      form.reset({
        name: user.name,
        email: user.email,
        bio: user.bio,
      });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user profile.";
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Card className="max-w-screen-md mx-auto mt-8 pb-4">
      <CardContent>
        <div className="w-full flex items-center justify-center my-8 h-full">
          <Avatar className="w-28 h-28 relative group">
            <AvatarImage src={userData?.avatar} />
            <AvatarFallback
              src={userData?.name ? userData.name.charAt(0) : "?"}
            />
          </Avatar>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} >
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
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
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          type="password"
                          placeholder="Enter bio"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full my-4">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
