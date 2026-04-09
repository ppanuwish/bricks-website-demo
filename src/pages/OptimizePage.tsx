import type { NavigateFn } from "../lib/navigation";
import { CtaBlock } from "../components/CtaBlock";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";

type OptimizePageProps = {
  navigate: NavigateFn;
};

export function OptimizePage({ navigate }: OptimizePageProps) {
  return (
    <div>
      <Hero
        tag="Product — Optimize"
        headline="Continuously optimise agent performance in production"
        sub="Monitor, evaluate, and improve your agents with real-time insights — so performance compounds over time, not just at launch."
      />
      <Section className="bg-white">
        <SectionHeader
          tag="Insights"
          title="Understand what's happening across every interaction"
          sub="Rule-based tagging for known patterns, AI-powered analysis for sentiment, intent, and nuance."
        />
      </Section>
      <Section className="bg-bricks-gray">
        <SectionHeader
          tag="Outcomes"
          title="See how agent interactions drive real business outcomes"
          sub="Custom dashboards linking interactions, decisions, and results."
        />
      </Section>
      <Section className="bg-white">
        <SectionHeader
          tag="Experimentation"
          title={
            <>
              Deploy improvements across
              <br />
              every agent, instantly
            </>
          }
          sub={
            'Deploy changes, test new approaches, and roll out improvements across every agent instantly. No retraining hundreds of people. No "I didn\'t get the memo."'
          }
        />
      </Section>
      <CtaBlock navigate={navigate} />
    </div>
  );
}
