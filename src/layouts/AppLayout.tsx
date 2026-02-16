import { Outlet } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";

const AppLayout = () => (
  <div className="flex flex-col min-h-screen bg-background">
    <AppNavbar />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

export default AppLayout;
