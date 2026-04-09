import { useEffect, useRef, type ReactNode } from "react";
import { Fade } from "./Fade";
import bricksLogo from "../assets/bricks-logo.svg";

type HeroProps = {
  tag?: string;
  headline: ReactNode;
  sub: string;
  hook?: string;
  isLight?: boolean;
};

export function Hero({ tag, headline, sub, hook, isLight }: HeroProps) {
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
      className={`relative flex min-h-screen items-center overflow-hidden ${
        isLight ? "bg-bricks-gray" : "bg-bricks-darkgray"
      }`}
    >
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div
        className={`pointer-events-none absolute -right-[8%] -top-[20%] h-[55vw] w-[55vw] rounded-full blur-[120px] ${
          isLight ? "bg-[rgba(175,240,232,0.2)]" : "bg-[rgba(253,1,69,0.04)]"
        }`}
      />
      <div className="relative mx-auto max-w-[820px] px-10 pb-[100px] pt-[140px]">
        {tag && (
          <Fade>
            <div className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[2px] text-bricks-red">
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
          <h1
            className={`mb-7 font-heading text-[clamp(38px,5.2vw,68px)] font-extrabold leading-[1.06] tracking-[-2.5px] ${
              isLight ? "text-bricks-darkgray" : "text-white"
            }`}
          >
            {headline}
          </h1>
        </Fade>
        <Fade d={160}>
          <p
            className={`mb-0 max-w-[620px] font-body text-[clamp(16px,1.8vw,19px)] leading-[1.8] ${
              isLight ? "text-bricks-darkgray/55" : "text-white/50"
            } ${hook ? "mb-6" : ""}`}
          >
            {sub}
          </p>
        </Fade>
        {hook && (
          <Fade d={240}>
            <p className="max-w-[520px] font-heading text-[clamp(19px,2.3vw,28px)] font-semibold leading-[1.35] tracking-[-0.5px] text-bricks-iceblue">
              {hook}
            </p>
          </Fade>
        )}
      </div>
    </section>
  );
}
