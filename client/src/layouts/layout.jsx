import Navbar from "@/components/navbar";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/footer";

const Layout = () => {
  return (
    <SidebarProvider>
      <Navbar />
      <AppSidebar />
      <main className="w-full h-full mt-24 px-8">
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
