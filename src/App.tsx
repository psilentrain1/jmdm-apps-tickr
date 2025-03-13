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
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
