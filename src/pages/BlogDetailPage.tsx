import { useEffect, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BlogDetailBottomNavigation } from "../components/BlogDetailBottomNavigation";
import { BlogDetailContent } from "../components/BlogDetailContent";
import { BlogDetailHeader } from "../components/BlogDetailHeader";
import { BlogDetailNavigation } from "../components/BlogDetailNavigation";
import {
  BlogDetailRelateBlogs,
  type RelatedBlogItem,
} from "../components/BlogDetailRelateBlogs";
import type { BlogCardData } from "../components/BlogCard";
import {
  getAdjacentPosts,
  getPostBySlug,
  getRelatedPosts,
  withFallbackBlogImage,
} from "../data/blogPosts";

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const resolved = slug ? getPostBySlug(slug) : null;
  const activePost: BlogCardData | null = resolved
    ? withFallbackBlogImage(resolved)
    : null;

  useEffect(() => {
    if (!activePost) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activePost]);

  const relatedBlogs: RelatedBlogItem[] = useMemo(() => {
    if (!activePost) return [];
    return getRelatedPosts(activePost, 3);
  }, [activePost]);

  const { prev: prevPost, next: nextPost } = useMemo(() => {
    if (!activePost) return { prev: null, next: null };
    return getAdjacentPosts(activePost);
  }, [activePost]);

  if (!activePost) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-white pb-16 pt-[72px]">
      <section className="mx-auto w-full max-w-[1280px] bg-white">
        <BlogDetailHeader category={activePost.category} />

        <div className="px-6 pb-16 pt-8 md:px-16">
          <BlogDetailNavigation
            selectedCategory={activePost.category}
            postTitle={activePost.title}
          />

          <BlogDetailContent post={activePost} />

          <BlogDetailBottomNavigation
            prevPost={prevPost}
            nextPost={nextPost}
          />

          <BlogDetailRelateBlogs
            relatedBlogs={relatedBlogs}
            sectionTitle="Related articles"
          />
        </div>
      </section>
    </div>
  );
}
