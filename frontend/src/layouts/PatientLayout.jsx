import PatientNavbar from "../components/PatientNavbar";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  return (
    <div className="flex min-h-screen">
      <PatientNavbar />
      <main className="flex-1 bg-slate-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
