import { useState, useEffect, useRef, type ReactNode } from "react";

type FadeProps = { children: ReactNode; d?: number };

export function Fade({ children, d = 0 }: FadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), d);
          obs.unobserve(el);
        }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [d]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      }`}
      style={{ transitionDelay: `${d}ms` }}
    >
      {children}
    </div>
  );
}
