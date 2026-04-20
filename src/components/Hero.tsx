import { useEffect, useRef, type ReactNode } from "react";
import { Fade } from "./Fade";
import bricksLogo from "../assets/bricks-logo.svg";

type HeroProps = {
  tag?: string;
  headline: ReactNode;
  sub: string;
  hook?: string;
};

export function Hero({ tag, headline, sub, hook }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    const handleMouseDown = () => cursor.classList.add("click");
    const handleMouseUp = () => cursor.classList.remove("click");
    const handleMouseEnter = () => cursor.classList.add("active");
    const handleMouseLeave = () => {
      cursor.classList.remove("active");
      cursor.classList.remove("click");
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mousedown", handleMouseDown);
    section.addEventListener("mouseup", handleMouseUp);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mousedown", handleMouseDown);
      section.removeEventListener("mouseup", handleMouseUp);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-custom-cursor-zone="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-bricks-darkgray"
    >
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-[8%] -top-[20%] h-[55vw] w-[55vw] rounded-full bg-primary/15 blur-[120px]" />
      <div className="relative mx-auto max-w-[820px] px-6 pb-[100px] pt-[140px] md:px-10">
        {tag && (
          <Fade>
            <div className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[2px] text-white">
              <img
                src={bricksLogo}
                alt=""
                className="h-[10px] w-[10px]"
                aria-hidden="true"
              />
              {tag}
            </div>
          </Fade>
        )}
        <Fade d={80}>
          <h1 className="mb-7 font-heading text-[clamp(38px,5.2vw,68px)] font-extrabold leading-[1.06] tracking-[-2.5px] text-white">
            {headline}
          </h1>
        </Fade>
        <Fade d={160}>
          <p
            className={`mb-0 max-w-[620px] font-body text-[clamp(16px,1.8vw,19px)] leading-[1.8] text-white/70 ${hook ? "mb-6" : ""}`}
          >
            {sub}
          </p>
        </Fade>
        {hook && (
          <Fade d={240}>
            <p className="max-w-[520px] font-heading text-[clamp(19px,2.3vw,28px)] font-semibold leading-[1.35] tracking-[-0.5px] text-white">
              {hook}
            </p>
          </Fade>
        )}
      </div>
    </section>
  );
}
