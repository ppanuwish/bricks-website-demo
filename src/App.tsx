import { useState } from "react";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import {
  AboutPage,
  BuildPage,
  ContactPage,
  HomePage,
  IndustryPage,
  MonitorPage,
  OptimizePage,
} from "./pages";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage navigate={setPage} />;
      case "build":
        return <BuildPage navigate={setPage} />;
      case "monitor":
        return <MonitorPage navigate={setPage} />;
      case "optimize":
        return <OptimizePage navigate={setPage} />;
      case "finserv":
        return <IndustryPage navigate={setPage} industry="finserv" />;
      case "health":
        return <IndustryPage navigate={setPage} industry="health" />;
      case "about":
        return <AboutPage navigate={setPage} />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage navigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav currentPage={page} navigate={setPage} />
      {renderPage()}
      <Footer navigate={setPage} />
    </div>
  );
}
