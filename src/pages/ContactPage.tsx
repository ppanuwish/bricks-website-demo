import { Fade } from "../components/Fade";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const CONTACT_FIELDS = [
  {
    label: "Work email",
    placeholder: "you@company.com",
    autoComplete: "email" as const,
  },
  {
    label: "First name",
    placeholder: "Somchai",
    autoComplete: "given-name" as const,
  },
  {
    label: "Last name",
    placeholder: "Prasert",
    autoComplete: "family-name" as const,
  },
  {
    label: "Job title",
    placeholder: "Head of operations",
    autoComplete: "organization-title" as const,
  },
  {
    label: "Phone",
    placeholder: "+66 81 234 5678",
    autoComplete: "tel" as const,
  },
  {
    label: "Company",
    placeholder: "Acme Corporation Co., Ltd.",
    autoComplete: "organization" as const,
  },
  {
    label: "Industry",
    placeholder: "e.g. banking, healthcare, retail",
    autoComplete: "off" as const,
  },
] as const;

export function ContactPage() {
  return (
    <section className="flex min-h-screen items-center bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-[72px] px-6 pb-[100px] pt-[140px] md:grid-cols-2 md:px-10">
        <div className="min-w-0 w-full">
          <Fade>
            <h1 className="mb-3.5 font-heading text-[clamp(36px,4.5vw,56px)] font-extrabold leading-[1.08] tracking-[-2px] text-foreground">
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
            <p className="font-body text-base leading-[1.75] text-muted-foreground">
              Book a 30-minute demo. We'll show you a live AI agent handling a
              real scenario from your industry, in Thai — so you can see the
              quality for yourself.
            </p>
          </Fade>
        </div>
        <Fade d={120}>
          <div className="flex min-w-0 w-full flex-col gap-[var(--spacing-6)] border border-border bg-background p-[var(--spacing-6)] shadow-sm">
            <div className="flex w-full flex-col items-start gap-[6px]">
              <p className="w-full font-body text-base font-semibold leading-none tracking-[-0.4px] text-card-foreground">
                Book a 30-minute demo
              </p>
              <p className="w-full font-body text-sm leading-5 text-muted-foreground">
                Share your details and we'll follow up to schedule your session.
              </p>
            </div>
            <div className="flex w-full flex-col gap-[var(--spacing-4)]">
              {CONTACT_FIELDS.map(({ label, placeholder, autoComplete }) => (
                <Input
                  key={label}
                  label={label}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  showLabel
                  showDescription={false}
                  wrapperClassName="w-full"
                  className="w-full"
                  aria-label={label}
                />
              ))}
            </div>
            <div className="flex w-full items-start justify-between">
              <Button fullWidth size="lg" className="py-3 text-[15px]">
                Book a 30-minute demo
              </Button>
            </div>
            <p className="w-full font-body text-[11px] leading-[1.55] text-muted-foreground">
              We handle your data in accordance with PDPA. See our Privacy
              Policy.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}
