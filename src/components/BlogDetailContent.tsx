import type { BlogCardData } from "./BlogCard";

type BlogDetailContentProps = {
  post: BlogCardData;
};

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <>
      <h2 className="mb-4 font-heading text-[48px] leading-[1] text-bricks-darkgray">
        {post.title}
      </h2>

      <div className="mb-6 flex flex-wrap items-center text-base text-bricks-darkgray">
        <span className="mr-2 inline-block rounded-full bg-bricks-red px-[7px] py-[3px] text-[10px] font-semibold uppercase tracking-wide text-white">
          by
        </span>
        <span className="mr-2 font-body font-semibold">Bricks Technology</span>
        <span className="mx-1 text-bricks-darkgray/30">•</span>
        <span className="font-body text-bricks-darkgray/80">{post.date}</span>
        <span className="mx-1 text-bricks-darkgray/30">•</span>
        <span className="font-body text-bricks-darkgray/80">3 minutes read</span>
      </div>

      <div className="max-w-[1152px] space-y-6 font-body text-[14px] leading-[1.65] text-bricks-darkgray/75">
        <p>{post.excerpt}</p>
        <p>
          A new era for automation, agentic automation, provides a new path
          forward. Combining agents, robots, AI, and people, agentic automation
          can automate even the longest, most complex processes end to end.
        </p>
      </div>

      <div className="relative mx-auto my-8 aspect-video w-full max-w-[800px] overflow-hidden bg-bricks-darkgray/10">
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

      <h3 className="mb-4 font-heading text-[30px] leading-[1.2] text-bricks-darkgray">
        Header 2
      </h3>
      <div className="max-w-[1152px] space-y-6 font-body text-[14px] leading-[1.65] text-bricks-darkgray/75">
        <p>
          Businesses have known and benefitted from robotic process automation
          for years. Robots perform work tasks by interacting with screens,
          systems, and data like people do.
        </p>
        <p>
          AI agents are a much newer, emerging technology. Agents are
          AI-model-based, enabling them to work independently and improve over
          time. To automate long, complex, and dynamic enterprise processes,
          agents and robots need to work together.
        </p>
        <p>
          For more on UiPath Agents and our vision for agentic automation,{" "}
          <a href="#" className="font-semibold underline">
            Link
          </a>
          .
        </p>
      </div>
    </>
  );
}
