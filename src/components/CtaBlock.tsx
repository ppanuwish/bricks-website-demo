import type { NavigateFn } from "../lib/navigation";
import { goToPage } from "../lib/navigation";
import { Fade } from "./Fade";
import { Button } from "./Button";
import { Section } from "./Section";

type CtaBlockProps = {
  navigate: NavigateFn;
};

export function CtaBlock({ navigate }: CtaBlockProps) {
  return (
    <Section className="bg-bricks-darkgray">
      <Fade>
        <div className="py-12 text-center">
          <h2 className="mb-2.5 font-heading text-[clamp(28px,3.5vw,48px)] font-extrabold tracking-[-1.5px] text-white">
            Transform your operations.
          </h2>
          <p className="mb-10 font-heading text-[clamp(22px,3vw,38px)] font-medium tracking-[-0.5px] text-bricks-iceblue">
            Keep what your people know.
          </p>
          <Button
            onClick={() => goToPage(navigate, "contact")}
            size="lg"
          >
            Book a 30-minute demo
          </Button>
        </div>
      </Fade>
    </Section>
  );
}
