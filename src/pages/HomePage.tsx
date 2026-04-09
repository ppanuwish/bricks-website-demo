import type { NavigateFn } from "../lib/navigation";
import { goToPage } from "../lib/navigation";
import { BlogSection } from "../components/BlogSection";
import { CtaBlock } from "../components/CtaBlock";
import { Fade } from "../components/Fade";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { VideoHero } from "../components/VideoHero";

type HomePageProps = {
  navigate: NavigateFn;
};

export function HomePage({ navigate }: HomePageProps) {
  const go = (key: string) => goToPage(navigate, key);

  return (
    <div className="relative isolate">
      <VideoHero />

      <div className="relative z-10">
        <Hero
          tag="Reimagine how your firm operates"
          headline="Enterprise AI agents that transform the way your firm works"
          sub="Enterprise AI agents for your most complex operations — built for performance, compliance, and scale, in your customers' language."
          hook="People leave. What they know doesn't have to."
        />

        <Section className="bg-bricks-gray">
        <SectionHeader
          tag="Use cases"
          title="AI agents that transform operations across every function"
        />
        <div className="bg-bricks-darkgray/[0.06] p-px">
          <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-px">
            {[
              [
                "Customer Service",
                "AI agents that transform service operations, from frontline interactions to complex case resolution. Consistent, empathetic support in fluent Thai, 24/7.",
              ],
              [
                "Sales",
                "Revenue-driving agents that support the full sales cycle, from prospecting to post-sale expansion.",
              ],
              [
                "HR",
                "AI agents that power modern people operations, from employee support to strategic workforce processes.",
              ],
              [
                "Finance",
                "Autonomous agents that bring speed, accuracy, and control to financial operations at scale. Compliance rules encoded, not memorised.",
              ],
              [
                "Legal",
                "Intelligent agents that accelerate legal workflows while maintaining oversight, compliance, and control.",
              ],
              [
                "IT",
                "AI agents that extend your IT team, automating service delivery and strengthening operational resilience.",
              ],
            ].map(([title, body], i) => (
              <Fade key={title} d={i * 40}>
                <div className="h-full min-h-0">
                  <div className="group grid h-full min-h-0 grid-cols-[140px_1fr] items-baseline gap-5 bg-white px-6 py-6 transition-colors hover:bg-bricks-iceblue">
                    <span className="font-heading text-[15px] font-bold tracking-[-0.3px] text-bricks-darkgray transition-colors group-hover:text-bricks-red">
                      {title}
                    </span>
                    <p className="font-body text-sm leading-[1.7] text-bricks-darkgray/50 transition-colors group-hover:text-bricks-darkgray">
                      {body}
                    </p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeader
          tag="Why transform"
          title="What AI agents deliver that the status quo can't"
          center
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
          {[
            [
              "Expertise that compounds",
              "What your people figure out — every edge case, every hard-won judgment — becomes permanent and cumulative. Knowledge stops resetting with every departure and starts building. The organisation gets smarter every month.",
              "#FD0145",
            ],
            [
              "Outcomes you can engineer",
              "The results your organisation produces become designable — version-controlled, A/B-testable, consistent by architecture, 100% auditable. Operational quality is a design decision, not a talent lottery.",
              "#1D9E8F",
            ],
            [
              "Change at the speed of strategy",
              "Scale in hours, not months. Deploy regulatory changes same-day. Expand without hiring locally. Your execution matches your ambition, without being throttled by adoption speed or headcount lag.",
              "#1A1A1A",
            ],
          ].map(([title, body, accent], i) => (
            <Fade key={i} d={i * 100}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-bricks-gray px-7 py-10">
                <div
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: accent }}
                />
                <h3 className="mb-3.5 font-heading text-[21px] font-bold leading-[1.3] tracking-[-0.5px] text-bricks-darkgray">
                  {title}
                </h3>
                <p className="font-body text-sm leading-[1.75] text-bricks-darkgray/50">
                  {body}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      <Section className="bg-bricks-darkgray">
        <SectionHeader
          title="Everything modern enterprises need to deploy and scale AI with confidence"
          center
          isDark
        />
        <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {[
            [
              "Security",
              "Protect data with encryption and PII redaction, while guardrails and compliance controls ensure your policies are followed in every interaction. Everything stays on your infrastructure.",
            ],
            [
              "Scale",
              "Architecture built for massive concurrency, delivering enterprise-grade performance, uptime, and stability.",
            ],
            [
              "Configurability",
              "Agents are tailored to your business and configurable across systems, workflows, and data to ensure they operate according to your standards.",
            ],
            [
              "Transparency",
              "Monitor agents in real time with enterprise access management, roles and permissions, data retention, and full transparency into every interaction.",
            ],
          ].map(([title, body], i) => (
            <Fade key={title} d={i * 80}>
              <div className="h-full">
                <div className="h-full rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-6 py-7">
                  <h4 className="mb-2.5 font-heading text-[15px] font-bold tracking-[-0.3px] text-white">
                    {title}
                  </h4>
                  <p className="font-body text-[13px] leading-[1.7] text-white/45">
                    {body}
                  </p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
        <Fade d={320}>
          <div className="mt-6 w-full rounded-xl border border-[rgba(175,240,232,0.15)] bg-[rgba(175,240,232,0.04)] px-6 py-5">
            <p className="font-body text-sm leading-[1.7] text-bricks-iceblue">
              <strong className="text-white">AI + Human</strong> — AI agents
              carry the operational baseline — the repetitive expertise your
              best people have mastered but shouldn't spend their careers
              repeating. Your people are freed to create new value. This is AI +
              Human, not AI vs Human.
            </p>
          </div>
        </Fade>
      </Section>

      <Section className="bg-bricks-gray">
        <SectionHeader
          tag="Platform"
          title="A single platform to build, manage, and monitor AI agents"
        />
        <div className="grid max-w-[620px] gap-3">
          {[
            [
              "Build",
              "Connect agents securely to your systems and data. Define behaviour, encode expertise, configure guardrails — giving you complete control over how agents operate.",
              "build",
            ],
            [
              "Monitor",
              "Track and monitor your agents in real time with full transparency into every interaction, while setting guardrails that ensure compliance with enterprise policies.",
              "monitor",
            ],
            [
              "Optimize",
              "Continuously monitor, evaluate, and improve agent performance in production. Real-time insights so performance compounds over time, not just at launch.",
              "optimize",
            ],
          ].map(([label, body, key], i) => (
            <Fade key={label} d={i * 80}>
              <div
                onClick={() => go(key)}
                className="cursor-pointer rounded-[14px] border-l-[3px] border-bricks-red bg-white py-7 pl-6 pr-6 [border-top-left-radius:0] [border-bottom-left-radius:0]"
              >
                <h4 className="mb-2 font-heading text-base font-bold tracking-[-0.3px] text-bricks-darkgray">
                  {label}
                </h4>
                <p className="font-body text-[13.5px] leading-[1.65] text-bricks-darkgray/50">
                  {body}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeader
          tag="Implementation"
          title="Our teams handle the full implementation"
        />
        <Fade>
          <p className="max-w-[600px] font-body text-[17px] leading-[1.8] text-bricks-darkgray/60">
            From setup and integration to training and launch, making sure every
            agent is tuned to your language, culture, and context. Most teams
            see a live agent in days, not months.
          </p>
        </Fade>
      </Section>

      <Section className="bg-bricks-gray">
        <SectionHeader
          tag="Industries"
          title="Built to adapt to the unique demands of every industry"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            [
              "Financial Services",
              "From onboarding to loans, claims and disputes, AI agents navigate high-stakes processes seamlessly.",
              "finserv",
            ],
            [
              "Healthcare",
              "Consistent care protocols, compassionate Thai-language support, and patient data sovereignty — across every shift and every department.",
              "health",
            ],
          ].map(([title, body, key], i) => (
            <Fade key={title} d={i * 80}>
              <div
                onClick={() => go(key)}
                className="cursor-pointer rounded-[14px] border border-bricks-darkgray/[0.05] bg-white px-7 py-8"
              >
                <h4 className="mb-2.5 font-heading text-lg font-bold tracking-[-0.3px] text-bricks-darkgray">
                  {title}
                </h4>
                <p className="font-body text-sm leading-[1.7] text-bricks-darkgray/50">
                  {body}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      <Section className="bg-bricks-darkgray">
        <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
          <div>
            <SectionHeader
              tag="Experience"
              title={
                <>
                  AI agents that don't
                  <br />
                  sound like AI
                </>
              }
              isDark
            />
            <Fade>
              <p className="mb-5 font-body text-base leading-[1.8] text-white/50">
                Built for Thai — not translated into it. Idiom, cultural
                context, formality registers, emotional intelligence that makes
                every interaction feel natural.
              </p>
            </Fade>
            <Fade d={80}>
              <p className="font-heading text-lg font-semibold leading-[1.5] text-bricks-iceblue">
                Your customers shouldn't have to adjust to your AI. Your AI
                should adjust to them.
              </p>
            </Fade>
          </div>
          <Fade d={120}>
            <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] px-7 py-9">
              <div className="mb-5 flex gap-2">
                <div className="bricks-round h-2.5 w-2.5 rounded-full bg-bricks-red" />
                <div className="bricks-round h-2.5 w-2.5 rounded-full bg-bricks-iceblue/40" />
                <div className="bricks-round h-2.5 w-2.5 rounded-full bg-white/12" />
              </div>
              {[
                {
                  from: true,
                  text: "สวัสดีค่ะ ดิฉันต้องการสอบถามเรื่องสินเชื่อบ้านค่ะ",
                },
                {
                  from: false,
                  text: "สวัสดีค่ะ ยินดีให้บริการค่ะ ไม่ทราบว่าสนใจสินเชื่อประเภทไหนคะ ดิฉันช่วยอธิบายได้เลยค่ะ",
                },
                {
                  from: true,
                  text: "สนใจสินเชื่อบ้านอัตราดอกเบี้ยคงที่ค่ะ",
                },
              ].map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2.5 flex ${msg.from ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 font-body text-[13px] leading-[1.55] ${
                      msg.from
                        ? "rounded-[14px_14px_4px_14px] bg-bricks-red text-white"
                        : "rounded-[14px_14px_14px_4px] bg-white/[0.06] text-white/80"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </Section>

      <Section className="bg-bricks-gray">
        <Fade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["—", "workflows encoded"],
              ["—%", "outcome consistency"],
              ["24/7", "from day one"],
            ].map(([num, label], i) => (
              <div key={i} className="px-5 py-6 text-center">
                <div className="font-heading text-[32px] font-extrabold tracking-[-1px] text-bricks-red">
                  {num}
                </div>
                <div className="mt-1 font-body text-xs font-semibold uppercase tracking-wide text-bricks-darkgray/40">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </Section>

      <Section className="bg-bricks-iceblue">
        <SectionHeader tag="Ownership" title="What you transform stays yours" />
        <Fade>
          <p className="max-w-[620px] font-body text-[17px] leading-[1.8] text-bricks-darkgray/60">
            Every workflow your agents learn, every pattern they encode, every
            insight they generate — stays inside your firm. On your
            infrastructure. Under your policies. Owned by your team. You own
            every agent, every workflow, every byte of encoded knowledge.
          </p>
        </Fade>
      </Section>

      <Section className="bg-bricks-gray">
        <BlogSection />
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
          sub="We don't need to learn your market — we built our company in it. Same timezone, same regulations, same language, same market realities. Our agents speak Thai the way your customers think in it."
        />
      </Section>

        <CtaBlock navigate={navigate} />
      </div>
    </div>
  );
}
