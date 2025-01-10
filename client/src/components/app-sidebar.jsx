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
import { Circle, House, LayoutGrid, MessageCircle, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="font-semibold">MERN Blogs</h1>
      </SidebarHeader>
      <SidebarContent className="bg-white mt-8 py-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <House />
                <Link to="/">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
               <LayoutGrid />
                <Link to="/">Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <ScrollText />
                <Link to="">Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <MessageCircle />
                <Link to="">Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {[1, 2, 3, 4, 5].map((c, i) => (
              <SidebarMenuButton key={i}>
                <div className="w-2 h-2 border rounded-full border-black" />
                Bussiness
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
