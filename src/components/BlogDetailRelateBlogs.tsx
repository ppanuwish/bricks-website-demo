import { BlogCard, type BlogCardData } from "./BlogCard";
import type { NavigateFn } from "../lib/navigation";
import { goToPage } from "../lib/navigation";

export type RelatedBlogItem = BlogCardData;

type BlogDetailRelateBlogsProps = {
  navigate: NavigateFn;
  relatedBlogs: RelatedBlogItem[];
  onSelectPost?: (post: BlogCardData) => void;
  sectionTitle?: string;
};

export function BlogDetailRelateBlogs({
  navigate,
  relatedBlogs,
  onSelectPost,
  sectionTitle = "Header 1",
}: BlogDetailRelateBlogsProps) {
  return (
    <>
      <h3 className="mb-8 mt-16 text-center font-heading text-[56px] leading-[1] text-bricks-darkgray">
        {sectionTitle}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {relatedBlogs.map((item, i) => (
          <BlogCard
            key={`${item.title}-${i}`}
            post={item}
            onClick={() => {
              onSelectPost?.(item);
              goToPage(navigate, "blog-detail");
            }}
          />
        ))}
      </div>
    </>
  );
}
