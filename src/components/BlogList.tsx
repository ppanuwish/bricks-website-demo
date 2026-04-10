import { useEffect, useMemo, useState } from "react";
import {
  samplePostsByCategory,
  withFallbackBlogImages,
} from "../data/blogPosts";
import { Fade } from "./Fade";
import { BlogCard, type BlogCardData } from "./BlogCard";
import { BlogMenu, type BlogCategory } from "./BlogMenu";

export type { BlogCategory };

type BlogListProps = {
  showHeading?: boolean;
  onCardClick?: (post: BlogCardData) => void;
  selectedCategory?: BlogCategory;
  /** When false, render `Menu` in the parent and pass `activeCategory`. */
  showCategoryMenu?: boolean;
  /** Controlled category when `showCategoryMenu` is false. */
  activeCategory?: BlogCategory;
  /** Skip the max-width wrapper when the parent already provides layout (e.g. with `Menu`). */
  omitOuterContainer?: boolean;
  /** When set, shows a primary CTA instead of a load-more control (e.g. navigate to the blog index). */
  onViewAllBlogs?: () => void;
};

export function BlogList({
  showHeading = true,
  onCardClick,
  selectedCategory = "All category",
  showCategoryMenu = true,
  activeCategory: activeCategoryProp,
  omitOuterContainer = false,
  onViewAllBlogs,
}: BlogListProps) {
  const [internalCategory, setInternalCategory] =
    useState<BlogCategory>(selectedCategory);

  useEffect(() => {
    if (showCategoryMenu) {
      setInternalCategory(selectedCategory);
    }
  }, [selectedCategory, showCategoryMenu]);

  const activeCategory = showCategoryMenu
    ? internalCategory
    : (activeCategoryProp ?? "All category");

  const cardData = useMemo(() => {
    const selected = samplePostsByCategory[activeCategory];

    if (activeCategory === "All category") {
      const repeated: BlogCardData[] = [];
      for (let i = 0; i < 9; i += 1) {
        repeated.push(selected[i % selected.length]);
      }
      return withFallbackBlogImages(repeated);
    }

    const repeated: BlogCardData[] = [];
    for (let i = 0; i < 9; i += 1) {
      repeated.push(selected[i % selected.length]);
    }
    return withFallbackBlogImages(repeated);
  }, [activeCategory]);

  const content = (
    <div className="flex flex-col gap-[40px]">
      {showHeading && (
        <Fade>
          <h2 className="font-heading text-[clamp(26px,3.2vw,46px)] font-extrabold leading-[1] tracking-[-1.5px] text-bricks-darkgray">
            Blog
          </h2>
        </Fade>
      )}

      {showCategoryMenu ? (
        <BlogMenu
          activeCategory={activeCategory}
          onSelectCategory={setInternalCategory}
        />
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cardData.map((item, i) => (
          <Fade key={`${item.title}-${i}`} d={30 + i * 20}>
            <BlogCard
              post={item}
              onClick={
                onCardClick ? () => onCardClick(item) : undefined
              }
            />
          </Fade>
        ))}
      </div>

      {onViewAllBlogs ? (
        <Fade d={260}>
          <div className="flex justify-center">
            <button
              type="button"
              className="h-9 bg-bricks-red px-4 font-body text-sm font-semibold text-white"
              onClick={onViewAllBlogs}
            >
              View all blogs
            </button>
          </div>
        </Fade>
      ) : null}
    </div>
  );

  if (omitOuterContainer) {
    return content;
  }

  return (
    <div className="mx-auto w-full max-w-[1280px]">{content}</div>
  );
}
