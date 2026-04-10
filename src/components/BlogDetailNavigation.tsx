import type { NavigateFn } from "../lib/navigation";
import { goToPage } from "../lib/navigation";

type BlogDetailNavigationProps = {
  navigate: NavigateFn;
  selectedCategory: string;
  onNavigateToBlogCategory?: (category: string) => void;
  postTitle: string;
};

export function BlogDetailNavigation({
  navigate,
  selectedCategory,
  onNavigateToBlogCategory,
  postTitle,
}: BlogDetailNavigationProps) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] text-bricks-darkgray/40">
      <button
        type="button"
        onClick={() => {
          onNavigateToBlogCategory?.("All category");
          goToPage(navigate, "blog");
        }}
        className="hover:text-bricks-red"
      >
        All Blog
      </button>
      <span>›</span>
      <button
        type="button"
        onClick={() => {
          onNavigateToBlogCategory?.(selectedCategory);
          goToPage(navigate, "blog");
        }}
        className="hover:text-bricks-red"
      >
        {selectedCategory}
      </button>
      <span>›</span>
      <span className="text-bricks-darkgray/80">{postTitle}</span>
    </div>
  );
}
