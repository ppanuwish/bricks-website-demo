import { useNavigate } from "react-router-dom";
import { goToBlogCategory } from "../lib/navigation";

type BlogDetailNavigationProps = {
  selectedCategory: string;
  postTitle: string;
};

export function BlogDetailNavigation({
  selectedCategory,
  postTitle,
}: BlogDetailNavigationProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 font-body text-[11px] text-muted-foreground">
      <button
        type="button"
        onClick={() => goToBlogCategory((to) => navigate(to), "All category")}
        className="transition-colors hover:text-primary"
      >
        All Blog
      </button>
      <span>›</span>
      <button
        type="button"
        onClick={() =>
          goToBlogCategory((to) => navigate(to), selectedCategory)
        }
        className="transition-colors hover:text-primary"
      >
        {selectedCategory}
      </button>
      <span>›</span>
      <span className="text-foreground/80">{postTitle}</span>
    </div>
  );
}
