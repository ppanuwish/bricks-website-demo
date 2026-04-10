import { useEffect, useMemo } from "react";
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
  getDefaultBlogPost,
  getRelatedPosts,
  withFallbackBlogImage,
} from "../data/blogPosts";
import type { NavigateFn } from "../lib/navigation";

type BlogDetailPageProps = {
  navigate: NavigateFn;
  post: BlogCardData | null;
  onNavigateToBlogCategory?: (category: string) => void;
  onSelectPost: (post: BlogCardData) => void;
};

export function BlogDetailPage({
  navigate,
  post,
  onNavigateToBlogCategory,
  onSelectPost,
}: BlogDetailPageProps) {
  const activePost = withFallbackBlogImage(post ?? getDefaultBlogPost());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activePost.title, activePost.date]);

  const relatedBlogs: RelatedBlogItem[] = useMemo(
    () => getRelatedPosts(activePost, 3),
    [activePost],
  );

  const { prev: prevPost, next: nextPost } = useMemo(
    () => getAdjacentPosts(activePost),
    [activePost],
  );

  return (
    <div className="bg-white pb-16 pt-[72px]">
      <section className="mx-auto w-full max-w-[1280px] bg-white">
        <BlogDetailHeader category={activePost.category} />

        <div className="px-6 pb-16 pt-8 md:px-16">
          <BlogDetailNavigation
            navigate={navigate}
            selectedCategory={activePost.category}
            onNavigateToBlogCategory={onNavigateToBlogCategory}
            postTitle={activePost.title}
          />

          <BlogDetailContent post={activePost} />

          <BlogDetailBottomNavigation
            navigate={navigate}
            prevPost={prevPost}
            nextPost={nextPost}
            onSelectPost={onSelectPost}
          />

          <BlogDetailRelateBlogs
            navigate={navigate}
            relatedBlogs={relatedBlogs}
            onSelectPost={onSelectPost}
            sectionTitle="Related articles"
          />
        </div>
      </section>
    </div>
  );
}
