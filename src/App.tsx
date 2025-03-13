import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-grow flex-row">
        <Sidebar />
        <main className="flex-grow border-1 border-yellow-500">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
