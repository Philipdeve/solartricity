import { AdminNavbar, SmallSidebar, BigSidebar } from "../../components";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div>
      <main className="grid grid-rows-1 lg:grid-cols-[auto,1fr]">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <AdminNavbar />
          <div className="w-[90vw] mx-auto py-8 lg:w-11/12">
            <Outlet /> {/* Renders the child components */}
          </div>
        </div>
      </main>

    </div>
  );
};

export default SharedLayout;
