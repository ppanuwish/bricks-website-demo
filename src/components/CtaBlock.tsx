import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { goToPage } from "../lib/navigation";
import { Fade } from "./Fade";
import { Button } from "./Button";
import { Section } from "./Section";

/** Bricks light-mode primary button tokens so the CTA stays on-brand when the site is in dark mode. */
const ctaButtonLightVars = {
  "--color-primary": "#fd0145",
  "--color-primary-foreground": "#ffffff",
  "--color-button-primary-hover-overlay": "#ffffff1a",
  "--color-button-shadow": "rgba(0, 0, 0, 0.05)",
  "--color-button-focus-outline": "rgba(163, 163, 163, 0.5)",
} as const satisfies Record<string, string>;

export function CtaBlock() {
  const navigate = useNavigate();
  return (
    <Section className="bg-bricks-iceblue">
      <Fade>
        <div className="py-12 text-center">
          <h2 className="mb-2.5 font-heading text-[clamp(28px,3.5vw,48px)] font-extrabold tracking-[-1.5px] text-bricks-darkgray">
            Transform your operations.
          </h2>
          <p className="mb-10 font-heading text-[clamp(22px,3vw,38px)] font-medium tracking-[-0.5px] text-bricks-red">
            Keep what your people know.
          </p>
          <span
            className="inline-flex"
            style={ctaButtonLightVars as CSSProperties}
          >
            <Button
              onClick={() => goToPage((to) => navigate(to), "contact")}
              size="lg"
            >
              Book a 30-minute demo
            </Button>
          </span>
        </div>
      </Fade>
    </Section>
  );
}
