export type BlogCardData = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
};

type BlogCardProps = {
  post: BlogCardData;
  onClick?: () => void;
};

export function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <article
      onClick={onClick}
      className={`flex min-w-0 max-w-full flex-col overflow-hidden bg-card shadow-sm ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-foreground/10">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-col gap-3 p-6">
        <span className="inline-flex w-fit max-w-full bg-primary px-2 py-[2px] font-body text-[12px] font-semibold leading-4 text-primary-foreground">
          {post.category}
        </span>
        <h3 className="line-clamp-1 min-w-0 font-body text-[24px] font-semibold leading-8 text-foreground">
          {post.title}
        </h3>
        <p className="line-clamp-2 min-w-0 font-body text-[18px] leading-7 text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="font-body text-[12px] leading-4 text-muted-foreground/80">
          {post.date}
        </p>
      </div>
    </article>
  );
}
