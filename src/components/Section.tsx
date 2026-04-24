import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Section({ children, className = "", narrow }: SectionProps) {
  return (
    <section
      className={`bg-background px-6 py-[120px] md:px-10 ${className}`.trim()}
    >
      <div
        className={`mx-auto w-full ${narrow ? "max-w-[700px]" : "max-w-[1200px]"}`}
      >
        {children}
      </div>
    </section>
  );
}
