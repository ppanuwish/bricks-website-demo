import type { BlogCardData } from "../components/BlogCard";
import { blogPostToSlug } from "../data/blogPosts";

export type NavigateFn = (to: string) => void;

/** Maps legacy page keys to URL paths. */
export const PAGE_PATHS: Record<string, string> = {
  home: "/",
  build: "/build",
  monitor: "/monitor",
  optimize: "/optimize",
  finserv: "/industry/finserv",
  health: "/industry/health",
  about: "/about",
  blog: "/blog",
  contact: "/contact",
};

export function goToPage(navigate: NavigateFn, key: string): void {
  const path = PAGE_PATHS[key];
  if (!path) return;
  navigate(path);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function goToBlogPost(navigate: NavigateFn, post: BlogCardData): void {
  navigate(`/blog/${blogPostToSlug(post)}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function goToBlogCategory(navigate: NavigateFn, category: string): void {
  if (category === "All category") {
    navigate("/blog");
  } else {
    navigate(`/blog?category=${encodeURIComponent(category)}`);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
