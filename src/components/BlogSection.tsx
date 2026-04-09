import { useEffect, useMemo, useState } from "react";
import { Fade } from "./Fade";

const menuItems = [
  "All category",
  "Case studies",
  "Utillities",
  "Technology",
  "Platform update",
  "News",
  "Events",
  "Clients",
] as const;

type BlogCategory = (typeof menuItems)[number];

type BlogSectionProps = {
  showHeading?: boolean;
  onCardClick?: (post: BlogCardData) => void;
  selectedCategory?: BlogCategory;
};

type BlogCardData = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
};

const samplePostsByCategory: Record<BlogCategory, BlogCardData[]> = {
  "All category": [
    {
      category: "Technology",
      title: "Agentic automation: The path to an orchestrated enterprise",
      excerpt:
        "In recent years, the introduction of AI has increased the power and impact of enterprise automation.",
      date: "10 October 2025",
    },
    {
      category: "Case studies",
      title: "How a banking team reduced handling time by 34%",
      excerpt:
        "A practical look at workflow redesign, triage rules, and multilingual agent rollout in production.",
      date: "08 October 2025",
    },
    {
      category: "Platform update",
      title: "New policy simulator for safer enterprise launches",
      excerpt:
        "Teams can now validate risky edge cases before publishing changes to live production agents.",
      date: "05 October 2025",
    },
  ],
  "Case studies": [
    {
      category: "Case studies",
      title: "Scaling insurance claims review with human-in-the-loop AI",
      excerpt:
        "How operations teams preserved quality while reducing repetitive triage work in peak periods.",
      date: "02 October 2025",
    },
    {
      category: "Case studies",
      title: "From fragmented support to unified service operations",
      excerpt:
        "A cross-channel transformation story covering rollout, governance, and measurable outcomes.",
      date: "27 September 2025",
    },
  ],
  Utillities: [
    {
      category: "Utillities",
      title: "Workflow templates for escalations and exception handling",
      excerpt:
        "Reusable utility packs that accelerate setup for operations teams in regulated environments.",
      date: "29 September 2025",
    },
    {
      category: "Utillities",
      title: "Practical checklist: launching your first supervised agent",
      excerpt:
        "A simple checklist to ensure observability, safety, and ownership before go-live.",
      date: "20 September 2025",
    },
  ],
  Technology: [
    {
      category: "Technology",
      title: "Agentic automation: The path to an orchestrated enterprise",
      excerpt:
        "In recent years, the introduction of AI has increased the power and impact of enterprise automation.",
      date: "10 October 2025",
    },
    {
      category: "Technology",
      title: "Designing systems where policy is executable",
      excerpt:
        "Why enterprise reliability improves when policy lives in architecture rather than memory.",
      date: "03 October 2025",
    },
  ],
  "Platform update": [
    {
      category: "Platform update",
      title: "Granular role-based controls now available across teams",
      excerpt:
        "Configure ownership, access, and approvals for every step of your agent lifecycle.",
      date: "06 October 2025",
    },
    {
      category: "Platform update",
      title: "Improved real-time monitoring for multi-agent workflows",
      excerpt:
        "New dashboards provide deeper insight into latency, handoffs, and resolution quality.",
      date: "01 October 2025",
    },
  ],
  News: [
    {
      category: "News",
      title: "Bricks partners with leading regional enterprise groups",
      excerpt:
        "New collaborations accelerate secure AI adoption across high-compliance industries.",
      date: "30 September 2025",
    },
    {
      category: "News",
      title: "Bricks expands customer success operations in Thailand",
      excerpt:
        "Additional field and enablement support for firms scaling enterprise AI programs.",
      date: "24 September 2025",
    },
  ],
  Events: [
    {
      category: "Events",
      title: "Live workshop: building compliant AI operations in finance",
      excerpt:
        "An applied session on risk controls, monitoring patterns, and deployment architecture.",
      date: "18 September 2025",
    },
    {
      category: "Events",
      title: "Executive roundtable: operating model redesign with AI",
      excerpt:
        "Leaders share practical lessons from transformation programs across large enterprises.",
      date: "12 September 2025",
    },
  ],
  Clients: [
    {
      category: "Clients",
      title: "Client spotlight: a multilingual service transformation",
      excerpt:
        "How one enterprise rebuilt customer operations for consistency, empathy, and speed.",
      date: "15 September 2025",
    },
    {
      category: "Clients",
      title: "Client spotlight: enterprise governance at scale",
      excerpt:
        "A behind-the-scenes look at ownership, controls, and auditability in production.",
      date: "09 September 2025",
    },
  ],
};

export function BlogSection({
  showHeading = true,
  onCardClick,
  selectedCategory = "All category",
}: BlogSectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<BlogCategory>(selectedCategory);

  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  const cardData = useMemo(() => {
    const selected = samplePostsByCategory[activeCategory];
    if (activeCategory === "All category") {
      const repeated: BlogCardData[] = [];
      for (let i = 0; i < 9; i += 1) {
        repeated.push(selected[i % selected.length]);
      }
      return repeated;
    }

    const repeated: BlogCardData[] = [];
    for (let i = 0; i < 9; i += 1) {
      repeated.push(selected[i % selected.length]);
    }
    return repeated;
  }, [activeCategory]);

  return (
    <div className="mx-auto w-full max-w-[1280px]">
      {showHeading && (
        <Fade>
          <h2 className="mb-16 font-heading text-[clamp(40px,5.8vw,72px)] font-extrabold leading-[1] tracking-[0] text-bricks-darkgray">
            Custom Header 1 7XL
          </h2>
        </Fade>
      )}

      <Fade d={20}>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveCategory(item)}
              className={`h-9 px-2.5 font-body text-[14px] font-semibold leading-5 ${
                activeCategory === item
                  ? "bg-bricks-red text-white"
                  : "bg-transparent text-bricks-darkgray hover:text-bricks-red"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </Fade>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cardData.map((item, i) => (
          <Fade key={`${item.title}-${i}`} d={30 + i * 20}>
            <article
              onClick={() => onCardClick?.(item)}
              className={`flex h-[480px] flex-col bg-[#f4f4f4] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] ${
                onCardClick ? "cursor-pointer" : ""
              }`}
            >
              <div className="h-[245px] w-full bg-[#ff4949]" />
              <div className="flex min-h-0 flex-1 flex-col gap-3 p-6">
                <span className="inline-flex w-fit bg-bricks-red px-2 py-[2px] font-body text-[12px] font-semibold leading-4 text-white">
                  {item.category}
                </span>
                <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-body text-[24px] font-semibold leading-8 text-bricks-darkgray">
                  {item.title}
                </h3>
                <p className="max-h-[56px] overflow-hidden font-body text-[18px] leading-7 text-bricks-darkgray/65">
                  {item.excerpt}
                </p>
                <p className="mt-auto font-body text-[12px] leading-4 text-bricks-darkgray/45">
                  {item.date}
                </p>
              </div>
            </article>
          </Fade>
        ))}
      </div>

      <Fade d={260}>
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="h-9 bg-bricks-red px-4 font-body text-sm font-semibold text-white"
          >
            Load more
          </button>
        </div>
      </Fade>
    </div>
  );
}
