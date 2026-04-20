import { useNavigate } from "react-router-dom";
import type { BlogCardData } from "./BlogCard";
import { goToBlogPost, goToPage } from "../lib/navigation";
import { Button } from "./Button";

type BlogDetailBottomNavigationProps = {
  prevPost: BlogCardData | null;
  nextPost: BlogCardData | null;
};

export function BlogDetailBottomNavigation({
  prevPost,
  nextPost,
}: BlogDetailBottomNavigationProps) {
  const navigate = useNavigate();
  const nav = (to: string) => navigate(to);

  return (
    <div className="mt-12 flex w-full flex-wrap items-start gap-8">
      <div className="flex min-w-[min(100%,280px)] flex-1 flex-col">
        <Button
          disabled={!prevPost}
          onClick={() => {
            if (prevPost) goToBlogPost(nav, prevPost);
            else goToPage(nav, "blog");
          }}
          size="sm"
          className="mb-3 w-fit self-start"
        >
          ← Previous Post
        </Button>
        <h4 className="font-heading text-[36px] leading-[1] text-foreground">
          {prevPost?.title ?? "—"}
        </h4>
        <p className="font-body text-base text-foreground/75">
          Bricks Technology ・ {prevPost ? "3 minutes read" : "—"}
        </p>
      </div>

      <div className="flex min-w-[min(100%,280px)] flex-1 flex-col items-end text-right">
        <Button
          disabled={!nextPost}
          onClick={() => {
            if (nextPost) goToBlogPost(nav, nextPost);
            else goToPage(nav, "blog");
          }}
          size="sm"
          className="mb-3 w-fit self-end"
        >
          Next Post →
        </Button>
        <h4 className="font-heading text-[36px] leading-[1] text-foreground">
          {nextPost?.title ?? "—"}
        </h4>
        <p className="font-body text-base text-foreground/75">
          Bricks Technology ・ {nextPost ? "5 minutes read" : "—"}
        </p>
      </div>
    </div>
  );
}
