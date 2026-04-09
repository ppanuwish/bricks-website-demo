import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Section({ children, className = "", narrow }: SectionProps) {
  return (
    <section className={`px-10 py-[120px] ${className}`}>
      <div
        className={`mx-auto w-full ${narrow ? "max-w-[700px]" : "max-w-[1200px]"}`}
      >
        {children}
      </div>
    </section>
  );
}
