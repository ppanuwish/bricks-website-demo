import { CtaBlock } from "../components/CtaBlock";
import { Fade } from "../components/Fade";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";

export function AboutPage() {
  return (
    <div>
      <Hero
        tag="About us"
        headline="The enterprise agent platform for operating model transformation"
        sub="Bricks helps leading enterprises build, manage, and monitor AI agents tuned for every use case, language, and regulatory environment."
      />
      <Section className="bg-white">
        <Fade>
          <div className="max-w-[640px]">
            <p className="mb-6 font-body text-[19px] leading-[1.85] text-bricks-darkgray/60">
              Every enterprise's greatest asset is what its people know. But
              that knowledge is fragile — it lives in heads, leaks with every
              resignation, hides in processes nobody can see.
            </p>
            <p className="font-body text-[19px] leading-[1.85] text-bricks-darkgray/60">
              We build the platform that changes this. AI agents that make
              expertise compound instead of reset. Outcomes you can engineer
              instead of hope for. Change that moves at the speed of your
              strategy, not the speed of human adoption. Everything staying
              inside the firm's walls.
            </p>
          </div>
        </Fade>
      </Section>
      <Section className="bg-bricks-gray">
        <SectionHeader
          tag="Culture"
          title="Capable, not dependent"
          sub="We believe technology should make firms more capable — not more dependent. We move fast, obsess over the experience, and measure our success by one thing: is the firm permanently stronger because of what we built?"
        />
      </Section>
      <Section className="bg-white">
        <SectionHeader
          title={
            <>
              Built in Thailand.
              <br />
              Fluent in Thai.
            </>
          }
        />
      </Section>
      <CtaBlock />
    </div>
  );
}
