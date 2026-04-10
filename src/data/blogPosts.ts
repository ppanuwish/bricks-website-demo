import type { BlogCardData } from "../components/BlogCard";
import type { BlogCategory } from "../components/BlogMenu";

export const BLOG_CARD_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
] as const;

export const samplePostsByCategory: Record<BlogCategory, BlogCardData[]> = {
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

export function withFallbackBlogImages(posts: BlogCardData[]): BlogCardData[] {
  return posts.map((post, i) => ({
    ...post,
    image:
      post.image ??
      BLOG_CARD_FALLBACK_IMAGES[i % BLOG_CARD_FALLBACK_IMAGES.length],
  }));
}

/** Same fallback rule as list cards: stable image per post within its category. */
export function withFallbackBlogImage(post: BlogCardData): BlogCardData {
  if (post.image) {
    return post;
  }
  const category = post.category as BlogCategory;
  const list = samplePostsByCategory[category] ?? [];
  const idx = list.findIndex((p) => postsMatch(p, post));
  const i = idx >= 0 ? idx : 0;
  return {
    ...post,
    image: BLOG_CARD_FALLBACK_IMAGES[i % BLOG_CARD_FALLBACK_IMAGES.length],
  };
}

export function getDefaultBlogPost(): BlogCardData {
  return samplePostsByCategory.Technology[0];
}

function postsMatch(a: BlogCardData, b: BlogCardData): boolean {
  return a.title === b.title && a.date === b.date;
}

export function getRelatedPosts(
  current: BlogCardData,
  limit = 3,
): BlogCardData[] {
  const category = current.category as BlogCategory;
  const inCategory = samplePostsByCategory[category] ?? [];
  const withImages = withFallbackBlogImages(inCategory);
  const others = withImages.filter((p) => !postsMatch(p, current));
  return others.slice(0, limit);
}

export function getAdjacentPosts(current: BlogCardData): {
  prev: BlogCardData | null;
  next: BlogCardData | null;
} {
  const category = current.category as BlogCategory;
  const list = samplePostsByCategory[category] ?? [];
  const withImages = withFallbackBlogImages(list);
  const idx = list.findIndex((p) => postsMatch(p, current));
  if (idx === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: idx > 0 ? withImages[idx - 1] : null,
    next: idx < list.length - 1 ? withImages[idx + 1] : null,
  };
}
