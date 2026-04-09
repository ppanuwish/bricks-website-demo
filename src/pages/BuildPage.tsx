import type { NavigateFn } from "../lib/navigation";
import { CtaBlock } from "../components/CtaBlock";
import { Fade } from "../components/Fade";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";

type BuildPageProps = {
  navigate: NavigateFn;
};

export function BuildPage({ navigate }: BuildPageProps) {
  return (
    <div>
      <Hero
        tag="Product — Build"
        headline={
          <>
            Encode your firm's expertise.
            <br />
            Build agents that last.
          </>
        }
        sub="Everything you need to create production-ready AI agents — grounded in your expertise, governed by your policies, owned by your organisation."
      />
      <Section className="bg-white">
        <SectionHeader
          tag="Capabilities"
          title="Build agents grounded in your firm's expertise"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {[
            [
              "Knowledge",
              "Connect agents securely to your firm's sources of truth. Documents, databases, processes, and the accumulated expertise of your team — permanently encoded.",
              "#FD0145",
            ],
            [
              "Instructions",
              "Build and configure agents end-to-end, from brand voice and workflows to knowledge and guardrails, giving you complete control over how agents operate.",
              "#1D9E8F",
            ],
            [
              "Skills",
              "Build specialised, reusable capabilities from your firm's best practices. Every skill your team creates becomes permanent operational IP.",
              "#1A1A1A",
            ],
            [
              "Guardrails",
              "Compliance built-in, not trained-in. Set boundaries so agents operate safely, consistently, and in full accordance with your policies — every time.",
              "#FD0145",
            ],
          ].map(([title, body, accent], i) => (
            <Fade key={title} d={i * 80}>
              <div className="relative overflow-hidden rounded-[14px] bg-bricks-gray px-6 py-8">
                <div
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: accent }}
                />
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
          tag="Testing"
          title="Test with confidence before you deploy"
          sub="Interact with agents in a live preview, validate with scripted scenarios, and measure confidence before anything goes live."
        />
      </Section>
      <Section className="bg-white">
        <SectionHeader
          tag="Deploy"
          title="Deploy everywhere your customers are"
          sub="Run agents that deliver instant, human-like assistance across voice, chat, and email, tuned to the tone and context of each channel. Built for Thai — not translated."
        />
      </Section>
      <Section className="bg-bricks-iceblue">
        <Fade>
          <div className="mx-auto max-w-[620px] text-center">
            <p className="font-body text-base leading-[1.75] text-bricks-darkgray/60">
              Everything your team builds — agents, skills, knowledge
              connections, guardrails — belongs to your firm. On your
              infrastructure. Portable if you need to move.
            </p>
          </div>
        </Fade>
      </Section>
      <CtaBlock navigate={navigate} />
    </div>
  );
}
