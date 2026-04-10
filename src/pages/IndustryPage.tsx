import { INDUSTRY_ACCENTS, INDUSTRY_CONTENT, type IndustryId } from "../data/industry";
import { CtaBlock } from "../components/CtaBlock";
import { Fade } from "../components/Fade";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";

type IndustryPageProps = {
  industry: IndustryId;
};

export function IndustryPage({ industry }: IndustryPageProps) {
  const d = INDUSTRY_CONTENT[industry];

  return (
    <div>
      <Hero tag={d.tag} headline={d.headline} sub={d.sub} />
      <Section className="bg-bricks-gray">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          {d.benefits.map(([title, body], i) => (
            <Fade key={i} d={i * 100}>
              <div className="relative overflow-hidden rounded-2xl border border-bricks-darkgray/[0.05] bg-white px-7 py-9">
                <div
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: INDUSTRY_ACCENTS[i] }}
                />
                <h3 className="mb-3 font-heading text-[19px] font-bold leading-[1.3] tracking-[-0.3px] text-bricks-darkgray">
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
      {d.platform && (
        <Section className="bg-white">
          <SectionHeader
            tag="Platform"
            title={"The agent platform for Thai " + d.tag.toLowerCase()}
            sub={d.platform}
          />
        </Section>
      )}
      <Section className={d.platform ? "bg-bricks-gray" : "bg-white"}>
        <SectionHeader
          tag="Local expertise"
          title={"Built by people who understand Thai " + d.tag.toLowerCase()}
        />
        <Fade>
          <p className="max-w-[600px] font-body text-[17px] leading-[1.8] text-bricks-darkgray/60">
            {d.local}
          </p>
        </Fade>
      </Section>
      <Section className="bg-bricks-iceblue">
        <SectionHeader
          tag="Ownership"
          title="What you transform stays inside your institution"
        />
        <Fade>
          <p className="max-w-[600px] font-body text-[17px] leading-[1.8] text-bricks-darkgray/60">
            {d.ownership}
          </p>
        </Fade>
      </Section>
      <CtaBlock />
    </div>
  );
}
