import { useEffect, useRef } from "react";

export function VideoHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
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
      data-custom-cursor-zone="video-hero"
      className="sticky top-0 z-0 h-[100svh] min-h-[100svh] overflow-hidden bg-black"
    >
      <div ref={cursorRef} className="cursor cursor-white" aria-hidden="true" />
      <video
        className="h-full min-h-0 w-full object-cover"
        src="/src/assets/AI Era Transformation Video.mp4"
        autoPlay
        muted
        loop
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
