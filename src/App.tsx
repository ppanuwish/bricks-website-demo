import { useState, useEffect } from "react";
import type { BlogCardData } from "./components/BlogCard";
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

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("Technology");
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogCardData | null>(
    null,
  );

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "3e05c1",
      },
      body: JSON.stringify({
        sessionId: "3e05c1",
        location: "App.tsx:useEffect[page]",
        message: "route state changed",
        data: { page, scrollY: window.scrollY },
        timestamp: Date.now(),
        runId: "post-fix",
        hypothesisId: "H1",
      }),
    }).catch(() => {});
    // #endregion
  }, [page]);

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
           case "blog":
        return (
          <BlogPage
            navigate={setPage}
            selectedCategory={selectedBlogCategory}
            onOpenPost={(post) => {
              setSelectedBlogCategory(post.category);
              setSelectedBlogPost(post);
            }}
          />
        );
      case "blog-detail":
        return (
          <BlogDetailPage
            navigate={setPage}
            post={selectedBlogPost}
            onNavigateToBlogCategory={(category) =>
              setSelectedBlogCategory(category)
            }
            onSelectPost={(post) => {
              setSelectedBlogPost(post);
              setSelectedBlogCategory(post.category);
            }}
          />
        );
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage navigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav navigate={setPage} page={page} />
      {renderPage()}
      <Footer navigate={setPage} />
    </div>
  );
}
