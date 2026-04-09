import { Fade } from "../components/Fade";
import { Button } from "../components/Button";

const FORM_FIELDS = [
  "Work email",
  "First name",
  "Last name",
  "Job title",
  "Phone",
  "Company",
  "Industry",
] as const;

export function ContactPage() {
  return (
    <section className="flex min-h-screen items-center bg-bricks-darkgray">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-center gap-[72px] px-10 pb-[100px] pt-[140px]">
        <div>
          <Fade>
            <h1 className="mb-3.5 font-heading text-[clamp(36px,4.5vw,56px)] font-extrabold leading-[1.08] tracking-[-2px] text-white">
              Transform your
              <br />
              operations.
            </h1>
          </Fade>
          <Fade d={80}>
            <p className="mb-7 font-heading text-[clamp(26px,3.5vw,42px)] font-medium tracking-[-1px] text-bricks-iceblue">
              Keep what your people know.
            </p>
          </Fade>
          <Fade d={160}>
            <p className="font-body text-base leading-[1.75] text-white/45">
              Book a 30-minute demo. We'll show you a live AI agent handling a
              real scenario from your industry, in Thai — so you can see the
              quality for yourself.
            </p>
          </Fade>
        </div>
        <Fade d={120}>
          <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.04] px-9 py-10">
            {FORM_FIELDS.map((label) => (
              <div key={label} className="mb-4">
                <label className="mb-1.5 block font-body text-xs font-medium tracking-wide text-white/40">
                  {label}
                </label>
                <input
                  className="box-border w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-bricks-red"
                  aria-label={label}
                />
              </div>
            ))}
            <Button className="mt-2 py-4 text-[15px]" fullWidth size="lg">
              Book a 30-minute demo
            </Button>
            <p className="mt-3.5 font-body text-[11px] leading-[1.55] text-white/25">
              We handle your data in accordance with PDPA. See our Privacy
              Policy.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}
