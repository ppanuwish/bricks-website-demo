import type { ReactNode } from "react";
import { Fade } from "./Fade";
import bricksLogo from "../assets/bricks-logo.svg";

type SectionHeaderProps = {
  tag?: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
};

export function SectionHeader({
  tag,
  title,
  sub,
  center,
}: SectionHeaderProps) {
  return (
    <Fade>
      <div
        className={`mb-14 ${
          center
            ? "mx-auto max-w-[620px] text-center"
            : "max-w-[580px] text-left"
        }`}
      >
        {tag && (
          <div className="mb-4 inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[2px] text-muted-foreground">
            <img
              src={bricksLogo}
              alt=""
              className="h-[10px] w-[10px]"
              aria-hidden="true"
            />
            {tag}
          </div>
        )}
        <h2
          className={`font-heading text-[clamp(26px,3.2vw,46px)] font-extrabold leading-[1.1] tracking-[-1.5px] text-foreground ${
            sub ? "mb-4" : ""
          }`}
        >
          {title}
        </h2>
        {sub && (
          <p className="mt-2.5 font-body text-base leading-[1.75] text-muted-foreground">
            {sub}
          </p>
        )}
      </div>
    </Fade>
  );
}
