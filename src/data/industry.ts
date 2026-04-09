export type IndustryId = "finserv" | "health";

export type IndustryContent = {
  tag: string;
  headline: string;
  sub: string;
  benefits: [string, string][];
  platform: string | null;
  local: string;
  ownership: string;
};

export const INDUSTRY_CONTENT: Record<IndustryId, IndustryContent> = {
  finserv: {
    tag: "Financial Services",
    headline: "What happens when your best relationship manager resigns?",
    sub: "From onboarding to loans, claims and disputes, AI agents navigate high-stakes financial processes seamlessly — while making sure institutional expertise compounds instead of resets.",
    benefits: [
      [
        "Expertise that compounds",
        "Every advisory workflow, client insight, and judgment call encoded permanently. Your institution's knowledge builds on itself, month after month.",
      ],
      [
        "Outcomes you can engineer",
        "BOT-compliant in every interaction, by design. Zero gap between regulation and practice. Quality consistent across every branch, every channel.",
      ],
      [
        "Change at the speed of strategy",
        "New regulation? Compliant by afternoon. New branch? Deploy without hiring locally. Capacity elastic, not fixed.",
      ],
    ],
    platform:
      "A single platform to build, manage, and monitor AI agents — designed for financial services operations and compliance requirements.",
    local:
      "We know BOT regulations. We understand Thai banking culture — the formality, the trust-building, the relationship expectations. We didn't enter your market. We started here.",
    ownership:
      "Your institution processes thousands of conversations daily. Each contains insights about client needs, product gaps, service patterns. With AI agents, that intelligence compounds inside your institution — on your infrastructure, under your governance.",
  },
  health: {
    tag: "Healthcare",
    headline: "When the night shift starts, patient care shouldn't restart from zero.",
    sub: "AI agents that maintain care continuity — across shifts, across departments, across time — in compassionate Thai. The patient never has to repeat their story.",
    benefits: [
      [
        "Expertise that compounds",
        "Clinical protocols, triage patterns, and institutional knowledge maintained continuously. No sawtooth reset every shift change.",
      ],
      [
        "Outcomes you can engineer",
        "Patient safety depends on protocol consistency. Same standard, every shift, every department. PDPA compliant by design.",
      ],
      [
        "Change at the speed of strategy",
        "New MOPH guidelines? Every agent updated same-day. Expanded services? Deploy without recruiting.",
      ],
    ],
    platform: null,
    local:
      "We understand MOPH regulations, Thai health insurance, and the way patients expect to be spoken to. Our agents don't just answer questions — they care for people.",
    ownership:
      "Every patient interaction contains clinical insights. Every shift handoff risks losing context. AI agents maintain continuity — with patient data staying sovereign on your infrastructure.",
  },
};

export const INDUSTRY_ACCENTS = ["#FD0145", "#1D9E8F", "#1A1A1A"] as const;
