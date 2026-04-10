import { useNavigate } from "react-router-dom";
import { BlogCard, type BlogCardData } from "./BlogCard";
import { goToBlogPost } from "../lib/navigation";

export type RelatedBlogItem = BlogCardData;

type BlogDetailRelateBlogsProps = {
  relatedBlogs: RelatedBlogItem[];
  sectionTitle?: string;
};

export function BlogDetailRelateBlogs({
  relatedBlogs,
  sectionTitle = "Header 1",
}: BlogDetailRelateBlogsProps) {
  const navigate = useNavigate();

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
            onClick={() => goToBlogPost((to) => navigate(to), item)}
          />
        ))}
      </div>
    </>
  );
}
