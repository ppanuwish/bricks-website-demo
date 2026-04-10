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
    <div className="mb-5 flex flex-wrap items-center gap-2 font-body text-[11px] text-bricks-darkgray/40">
      <button
        type="button"
        onClick={() => goToBlogCategory((to) => navigate(to), "All category")}
        className="hover:text-bricks-red"
      >
        All Blog
      </button>
      <span>›</span>
      <button
        type="button"
        onClick={() =>
          goToBlogCategory((to) => navigate(to), selectedCategory)
        }
        className="hover:text-bricks-red"
      >
        {selectedCategory}
      </button>
      <span>›</span>
      <span className="text-bricks-darkgray/80">{postTitle}</span>
    </div>
  );
}
