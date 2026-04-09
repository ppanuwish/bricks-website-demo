import type { NavigateFn } from "../lib/navigation";
import { goToPage } from "../lib/navigation";
import { BlogSection } from "../components/BlogSection";

type BlogPageProps = {
  navigate: NavigateFn;
  onOpenPost?: (category: string) => void;
  selectedCategory?: string;
};

export function BlogPage({
  navigate,
  onOpenPost,
  selectedCategory = "All category",
}: BlogPageProps) {
  return (
    <div className="bg-[#ececec] px-8 pb-16 pt-[110px] md:px-12 lg:px-16">
      <BlogSection
        showHeading={false}
        selectedCategory={
          selectedCategory as
            | "All category"
            | "Case studies"
            | "Utillities"
            | "Technology"
            | "Platform update"
            | "News"
            | "Events"
            | "Clients"
        }
        onCardClick={(post) => {
          onOpenPost?.(post.category);
          goToPage(navigate, "blog-detail");
        }}
      />
    </div>
  );
}
