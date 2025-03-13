import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex flex-row">
        <Sidebar />
        <main className="border-1 border-yellow-500 flex-grow">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
