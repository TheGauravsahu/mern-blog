import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { showToast } from "@/config/toastify";
import axios from "@/config/axios";
import LoadingSpinner from "@/components/loading";

const ListBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const listBlogs = async () => {
      setLoading(true);

      try {
        const data = (await axios.get("/blogs/me")).data;
        setBlogs(data.blogs);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const errorMessage =
          error.response?.data?.message || "Failed to fetch blogs.";

        showToast("error", errorMessage);
      }
    };

    listBlogs();
  }, [refreshData]);

  const deleteblog = async (id) => {
    try {
      const data = (await axios.delete(`/blogs/${id}`)).data;
      showToast("success", data.message);
      setRefreshData(!refreshData);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete blog.";
      showToast("error", errorMessage);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Card>
        <CardHeader>
          <Button asChild className="w-fit">
            <Link to={"/blogs/add"}>Add Blog</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs && blogs.length > 0 ? (
                blogs.map((b) => (
                  <TableRow key={b._id}>
                    <TableCell className="font-medium">
                      <div className="w-12 h-12 overflow-hidden">
                        <Link to={"/blog/" + b.slug}>
                          <img
                            src={b.image}
                            className="object-cover w-full h-full"
                          />
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{b.slug}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="hover:bg-green-500 hover:text-white"
                      >
                        <Link to={`/blogs/update/${b.slug}`}>
                          <Pencil />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => deleteblog(b._id)}
                        variant="outline"
                        className="hover:bg-green-500 hover:text-white"
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>No blogs found.</TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListBlogs;
