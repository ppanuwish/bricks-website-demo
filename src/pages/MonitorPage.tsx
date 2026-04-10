import type { NavigateFn } from "../lib/navigation";
import { CtaBlock } from "../components/CtaBlock";
import { Fade } from "../components/Fade";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";

type MonitorPageProps = {
  navigate: NavigateFn;
};

export function MonitorPage({ navigate }: MonitorPageProps) {
  return (
    <div>
      <Hero
        tag="Product — Monitor"
        headline={
          <>
            See everything.
            <br />
            Govern everything.
          </>
        }
        sub="Full visibility into every agent interaction, every decision, every outcome — in real time. Track and monitor your agents with full transparency and enterprise-grade controls."
      />
      <Section className="bg-white">
        <SectionHeader
          tag="Observability"
          title="Full visibility into every interaction"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {[
            [
              "Interaction log",
              "Every agent interaction documented automatically. Searchable, filterable, reviewable. No reliance on human self-reporting.",
            ],
            [
              "Decision trail",
              "Review agent reasoning, actions, and tool calls for any interaction. Complete explainability at scale.",
            ],
            [
              "Interaction insights",
              "Understand every experience through sentiment, outcomes, and quality signals. Insights from 100% of interactions — not a 5% sample.",
            ],
          ].map(([title, body], i) => (
            <Fade key={title} d={i * 80}>
              <div className="rounded-[14px] bg-bricks-gray px-6 py-7">
                <h4 className="mb-2.5 font-heading text-base font-bold text-bricks-darkgray">
                  {title}
                </h4>
                <p className="font-body text-[13.5px] leading-[1.65] text-bricks-darkgray/50">
                  {body}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </Section>
      <Section className="bg-bricks-gray">
        <SectionHeader
          tag="Issues"
          title="Turn agent issues into learning at scale"
          sub="Fix once, fixed forever."
        />
      </Section>
      <Section className="bg-white">
        <SectionHeader
          tag="Governance"
          title={
            <>
              Governance built-in,
              <br />
              not hoped-for
            </>
          }
          sub="Real-time policy enforcement with configurable rules and automated compliance checks. Governance is built into how agents operate — not added after deployment."
        />
      </Section>
      <CtaBlock navigate={navigate} />
    </div>
  );
}
