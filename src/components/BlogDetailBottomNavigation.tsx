import type { BlogCardData } from "./BlogCard";
import type { NavigateFn } from "../lib/navigation";
import { goToPage } from "../lib/navigation";

type BlogDetailBottomNavigationProps = {
  navigate: NavigateFn;
  prevPost: BlogCardData | null;
  nextPost: BlogCardData | null;
  onSelectPost: (post: BlogCardData) => void;
};

export function BlogDetailBottomNavigation({
  navigate,
  prevPost,
  nextPost,
  onSelectPost,
}: BlogDetailBottomNavigationProps) {
  return (
    <div className="mt-12 flex w-full flex-wrap items-start gap-8">
      <div className="flex min-w-[min(100%,280px)] flex-1 flex-col">
        <button
          type="button"
          disabled={!prevPost}
          onClick={() => {
            if (prevPost) onSelectPost(prevPost);
            else goToPage(navigate, "blog");
          }}
          className="mb-3 inline-flex w-fit shrink-0 self-start bg-bricks-red px-4 py-2 font-body text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous Post
        </button>
        <h4 className="font-heading text-[36px] leading-[1] text-bricks-darkgray">
          {prevPost?.title ?? "—"}
        </h4>
        <p className="font-body text-base text-bricks-darkgray/75">
          Bricks Technology ・ {prevPost ? "3 minutes read" : "—"}
        </p>
      </div>

      <div className="flex min-w-[min(100%,280px)] flex-1 flex-col items-end text-right">
        <button
          type="button"
          disabled={!nextPost}
          onClick={() => {
            if (nextPost) onSelectPost(nextPost);
            else goToPage(navigate, "blog");
          }}
          className="mb-3 inline-flex w-fit shrink-0 self-end bg-bricks-red px-4 py-2 font-body text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next Post →
        </button>
        <h4 className="font-heading text-[36px] leading-[1] text-bricks-darkgray">
          {nextPost?.title ?? "—"}
        </h4>
        <p className="font-body text-base text-bricks-darkgray/75">
          Bricks Technology ・ {nextPost ? "5 minutes read" : "—"}
        </p>
      </div>
    </div>
  );
}
