import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex h-screen flex-col bg-gray-800 text-gray-100">
      <Header />
      <div className="flex flex-grow flex-row">
        <Sidebar />
        <main className="mt-11 ml-48 flex-grow overflow-auto overscroll-contain bg-gray-800 p-4 pb-4">
          <Outlet />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgb(55, 65, 81)",
                color: "rgb(243, 244, 246)",
              },
            }}
          />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
