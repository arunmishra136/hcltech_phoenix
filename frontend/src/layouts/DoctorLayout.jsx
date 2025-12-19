import DoctorNavbar from "../components/DoctorNavbar";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DoctorNavbar />
      <main className="flex-1 bg-slate-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
