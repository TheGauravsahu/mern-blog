import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { House, LayoutGrid, MessageCircle, ScrollText } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "@/config/axios";

const AppSidebar = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/categories");
        const data = response.data;
        setCategories(data.categories);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Sidebar className="bg-background">
      <SidebarHeader className="text-foreground">
        <h1 className="font-semibold">MERN Blogs</h1>
      </SidebarHeader>
      <SidebarContent className="bg-background mt-8 py-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <House className="mr-2" />
                <Link to="/">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <LayoutGrid className="mr-2" />
                <Link to="/categories">Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <ScrollText className="mr-2" />
                <Link to="/blogs">Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <MessageCircle className="mr-2" />
                <Link to="">Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : (
              categories.map((c, i) => (
                <SidebarMenuButton
                  key={i}
                  className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="w-2 h-2 border rounded-full border-foreground" />
                  <Link to={"/blogs/" + c.slug}>{c.name}</Link>
                </SidebarMenuButton>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-background" />
    </Sidebar>
  );
};

export default AppSidebar;
