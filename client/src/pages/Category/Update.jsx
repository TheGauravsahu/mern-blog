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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "@/config/axios";
import { showToast } from "@/config/toastify";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();

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
      const data = (await axios.put(`/categories/update/${id}`, values)).data;
      showToast("success", data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update category.";
      showToast("error", errorMessage);
    }
  };

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const data = (await axios.get(`/categories/${id}`)).data;
        form.reset({ name: data.category.name });
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to get category.";
        showToast("error", errorMessage);
      }
    };

    getCategoryDetails();
  }, []);

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

export default Update;
