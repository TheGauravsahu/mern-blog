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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "@/config/axios";
import { showToast } from "@/config/toastify";

const Create = () => {
  const formSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const data = (await axios.post("/categories/create", values)).data;
      showToast("success", data.message);
      form.reset()
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update user profile.";
      showToast("error", errorMessage);
    }
  };

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
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

              <Button type="submit" className="w-full my-4">
                Add
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Create;
