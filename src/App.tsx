import { Outlet, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import {
  AboutPage,
  BlogDetailPage,
  BlogPage,
  BuildPage,
  ContactPage,
  HomePage,
  IndustryPage,
  MonitorPage,
  OptimizePage,
} from "./pages";

function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/monitor" element={<MonitorPage />} />
        <Route path="/optimize" element={<OptimizePage />} />
        <Route
          path="/industry/finserv"
          element={<IndustryPage industry="finserv" />}
        />
        <Route
          path="/industry/health"
          element={<IndustryPage industry="health" />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
