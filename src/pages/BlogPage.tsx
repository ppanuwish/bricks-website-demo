import { useEffect, useState } from "react";
import type { NavigateFn } from "../lib/navigation";
import { goToPage } from "../lib/navigation";
import type { BlogCardData } from "../components/BlogCard";
import { BlogList } from "../components/BlogList";
import { BlogMenu, type BlogCategory } from "../components/BlogMenu";

type BlogPageProps = {
  navigate: NavigateFn;
  onOpenPost?: (post: BlogCardData) => void;
  selectedCategory?: string;
};

export function BlogPage({
  navigate,
  onOpenPost,
  selectedCategory = "All category",
}: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>(
    selectedCategory as BlogCategory,
  );

  useEffect(() => {
    setActiveCategory(selectedCategory as BlogCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-[#ececec] px-8 pb-16 pt-[110px] md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-[1280px]">
        <BlogMenu
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <BlogList
          showHeading={false}
          showCategoryMenu={false}
          omitOuterContainer
          activeCategory={activeCategory}
          onCardClick={(post) => {
            onOpenPost?.(post);
            goToPage(navigate, "blog-detail");
          }}
        />
      </div>
    </div>
  );
}
