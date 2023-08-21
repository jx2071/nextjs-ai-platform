import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-900 text-white">
        <SideBar />
      </div>
      <main className="md:pl-72 ">
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;