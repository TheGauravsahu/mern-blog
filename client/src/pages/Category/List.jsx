import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { showToast } from "@/config/toastify";
import axios from "@/config/axios";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const listCategories = async () => {
      setLoading(true);

      try {
        const data = (await axios.get("/categories")).data;
        setCategories(data.categories);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const errorMessage =
          error.response?.data?.message || "Failed to fetch categories.";

        showToast("error", errorMessage);
      }
    };

    listCategories();
  }, [refreshData]);

  const deleteCategory = async (id) => {
    try {
      const data = (await axios.delete(`/categories/delete/${id}`)).data;
      showToast("success", data.message);
      setRefreshData(!refreshData);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete category.";
      showToast("error", errorMessage);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <Button asChild className="w-fit">
            <Link to={"/category/add"}>Add Category</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories && categories.length > 0 ? (
                categories.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="font-medium">{c.slug}</TableCell>
                    <TableCell className="flex  gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="hover:bg-green-500 hover:text-white"
                      >
                        <Link to={`/category/update/${c._id}`}>
                          <Pencil />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => deleteCategory(c._id)}
                        variant="outline"
                        className="hover:bg-green-500 hover:text-white"
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>No categories found.</TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default List;
