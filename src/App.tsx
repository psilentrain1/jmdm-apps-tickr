import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex h-screen flex-col bg-gray-800 text-gray-100">
      <Header />
      <div className="flex flex-grow flex-row">
        <Sidebar />
        <main className="mt-11 mb-9 ml-48 flex-grow overflow-auto overscroll-contain bg-gray-800 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
