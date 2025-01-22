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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "@/config/axios";
import { showToast } from "@/config/toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@/components/editor";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { decode } from "entities";

const UpdateBlog = () => {
  const { slug } = useParams();

  const [categories, setCategories] = useState([]);
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user).user;

  const formSchema = z.object({
    title: z.string().min(3, "Title must be atleast 3 characters long."),
    content: z.string().min(3, "Content must be atleast 3 characters long."),
    category: z.string().min(3, "Category must be atleast 3 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (!file) {
        showToast("error", "Image required.");
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("author", user._id);
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const data = (await axios.put(`/blogs/${slug}`, formData)).data;
      showToast("success", data.message);
      setLoading(false);
      form.reset();
    } catch (error) {
      setLoading(false);
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to add blog.";
      showToast("error", errorMessage);
    }
  };

  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const data = (await axios.get(`/blogs/${slug}`)).data;

        setPreview(data.blog.image);
        form.setValue("category", data.blog.category._id);
        form.setValue("title", data.blog.title);
        form.setValue("content", decode(data.blog.content));

        console.log(decode(data.blog.content));
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to get blog.";
        showToast("error", errorMessage);
      }
    };

    getBlogDetails();
  }, []);

  useEffect(() => {
    const listCategories = async () => {
      try {
        const data = (await axios.get("/categories")).data;
        setCategories(data.categories);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch categories.";

        showToast("error", errorMessage);
      }
    };

    listCategories();
  }, []);

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("content", data);
  };

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories &&
                              categories.map((c) => (
                                <SelectItem key={c._id} value={c._id}>
                                  {c.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3 cursor-pointer overflow-hidden">
                <span className="mb-2 block">Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed rounded">
                        {!filePreview && <p>Image</p>}
                        <img src={filePreview} />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Editor
                          props={{
                            initialData: field.value,
                            onChange: handleEditorData,
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={loading} type="submit" className="w-full my-4">
                {loading ? (
                  <Loader2 className="animate-spin text-center" size={48} />
                ) : (
                  <span>Update</span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateBlog;
