import { useEffect } from "react";
import { Outlet } from "react-router";
import { useStore } from "./hooks/useStore";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function App() {
  const sidebarOpen = useStore((state) => state.sidebarOpen);
  useEffect(() => {
    const contentArea = document.getElementById("contentArea");
    if (sidebarOpen) {
      contentArea.classList.add("ml-48");
      contentArea.classList.remove("ml-16");
    } else if (!sidebarOpen) {
      contentArea.classList.remove("ml-48");
      contentArea.classList.add("ml-16");
    }
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen flex-col bg-gray-800 text-gray-100">
      <Header />
      <div className="flex flex-grow flex-row">
        <Sidebar />
        <main
          id="contentArea"
          className="mt-11 ml-48 flex-grow overflow-auto overscroll-contain bg-gray-800 p-4 pb-4 transition-all duration-300 ease-in-out"
        >
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
