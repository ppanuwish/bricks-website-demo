import type { NavigateFn } from "../lib/navigation";
import { goToPage } from "../lib/navigation";

type BlogDetailPageProps = {
  navigate: NavigateFn;
  selectedCategory?: string;
  onNavigateToBlogCategory?: (category: string) => void;
};

const relatedBlogs = Array.from({ length: 3 }).map(() => ({
  category: "Technology",
  title: "Agentic automation: The path to an orchestrated enterprise",
  excerpt:
    "In recent years, the introduction of AI has increased the power and impact of enterprise automation.",
  date: "10 October 2025",
}));

export function BlogDetailPage({
  navigate,
  selectedCategory = "Technology",
  onNavigateToBlogCategory,
}: BlogDetailPageProps) {
  return (
    <div className="bg-white pb-16 pt-[72px]">
      <section className="mx-auto w-full max-w-[1280px] bg-white">
        <div className="bg-[#ff3f46] px-6 py-14 md:px-16 md:py-16">
          <h1 className="font-heading text-[clamp(42px,5.6vw,72px)] font-extrabold leading-[1] text-white">
            {selectedCategory}
          </h1>
        </div>

        <div className="px-6 pb-16 pt-8 md:px-16">
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
            <span className="text-bricks-darkgray/80">
              Agentic automation: The path to an orchestrated enterprise
            </span>
          </div>

          <h2 className="mb-4 font-heading text-[48px] leading-[1] text-bricks-darkgray">
            Header 1
          </h2>

          <div className="mb-6 flex flex-wrap items-center text-base text-bricks-darkgray">
            <span className="mr-2 inline-block rounded-full bg-bricks-red px-[7px] py-[3px] text-[10px] font-semibold uppercase tracking-wide text-white">
              by
            </span>
            <span className="mr-2 font-body font-semibold">Bricks Technology</span>
            <span className="mx-1 text-bricks-darkgray/30">•</span>
            <span className="font-body text-bricks-darkgray/80">10 October 2025</span>
            <span className="mx-1 text-bricks-darkgray/30">•</span>
            <span className="font-body text-bricks-darkgray/80">3 minutes read</span>
          </div>

          <div className="max-w-[1152px] space-y-6 font-body text-[14px] leading-[1.65] text-bricks-darkgray/75">
            <p>
              In recent years, the introduction of AI has increased the power and
              impact of enterprise automation, enabling us to strive for
              ever-greater efficiency and productivity. At the same time, the
              processes these automations are empowering have also grown in
              complexity.
            </p>
            <p>
              A new era for automation, agentic automation, provides a new path
              forward. Combining agents, robots, AI, and people, agentic
              automation can automate even the longest, most complex processes end
              to end.
            </p>
          </div>

          <div className="mx-auto my-8 h-[450px] w-full max-w-[800px] bg-[#ff4949]" />

          <h3 className="mb-4 font-heading text-[30px] leading-[1.2] text-bricks-darkgray">
            Header 2
          </h3>
          <div className="max-w-[1152px] space-y-6 font-body text-[14px] leading-[1.65] text-bricks-darkgray/75">
            <p>
              Businesses have known and benefitted from robotic process
              automation for years. Robots perform work tasks by interacting with
              screens, systems, and data like people do.
            </p>
            <p>
              AI agents are a much newer, emerging technology. Agents are
              AI-model-based, enabling them to work independently and improve
              over time. To automate long, complex, and dynamic enterprise
              processes, agents and robots need to work together.
            </p>
            <p>
              For more on UiPath Agents and our vision for agentic automation,{" "}
              <a href="#" className="font-semibold underline">
                Link
              </a>
              .
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-start justify-between gap-8">
            <div>
              <button
                type="button"
                onClick={() => goToPage(navigate, "blog")}
                className="mb-3 bg-bricks-red px-4 py-2 font-body text-sm font-semibold text-white"
              >
                ← Previous Post
              </button>
              <h4 className="font-heading text-[36px] leading-[1] text-bricks-darkgray">
                Header 2
              </h4>
              <p className="font-body text-base text-bricks-darkgray/75">
                Bricks Technology ・ 3 minutes read
              </p>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => goToPage(navigate, "blog")}
                className="mb-3 bg-bricks-red px-4 py-2 font-body text-sm font-semibold text-white"
              >
                Next Post →
              </button>
              <h4 className="font-heading text-[36px] leading-[1] text-bricks-darkgray">
                Header 2
              </h4>
              <p className="font-body text-base text-bricks-darkgray/75">
                Bricks Technology ・ 5 minutes read
              </p>
            </div>
          </div>

          <h3 className="mb-8 mt-16 text-center font-heading text-[56px] leading-[1] text-bricks-darkgray">
            Header 1
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {relatedBlogs.map((item, i) => (
              <article
                key={`${item.title}-${i}`}
                onClick={() => goToPage(navigate, "blog-detail")}
                className="cursor-pointer bg-[#f4f4f4] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]"
              >
                <div className="h-[245px] bg-[#ff4949]" />
                <div className="p-6">
                  <span className="inline-block bg-bricks-red px-2 py-[2px] font-body text-[12px] font-semibold leading-4 text-white">
                    {item.category}
                  </span>
                  <h4 className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap font-body text-[24px] font-semibold leading-8 text-bricks-darkgray">
                    {item.title}
                  </h4>
                  <p className="mt-3 max-h-[56px] overflow-hidden font-body text-[18px] leading-7 text-bricks-darkgray/65">
                    {item.excerpt}
                  </p>
                  <p className="mt-4 font-body text-[12px] leading-4 text-bricks-darkgray/45">
                    {item.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
