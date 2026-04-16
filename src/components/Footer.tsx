import { useNavigate } from "react-router-dom";
import { goToPage } from "../lib/navigation";
import enLogo from "../assets/en-logo.svg";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      ["Build", "build"],
      ["Monitor", "monitor"],
      ["Optimize", "optimize"],
    ] as const,
  },
  {
    title: "Industries",
    links: [
      ["Financial Services", "finserv"],
      ["Healthcare", "health"],
    ] as const,
  },
  {
    title: "Company",
    links: [
      ["About", "about"],
      ["Contact", "contact"],
    ] as const,
  },
] as const;

export function Footer() {
  const navigate = useNavigate();
  const go = (k: string) => goToPage((to) => navigate(to), k);

  return (
    <footer className="border-t border-border bg-muted px-6 pb-9 pt-14 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-10">
        <div>
          <div className="mb-2.5 flex items-center gap-2.5">
            <img
              src={enLogo}
              alt="Bricks"
              className="h-[22px] w-auto"
              draggable={false}
            />
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Your AI enterprise enabler.
          </p>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-3.5 font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-muted-foreground">
              {col.title}
            </p>
            {col.links.map(([name, key]) => (
              <p
                key={key}
                onClick={() => go(key)}
                className="mb-2.5 cursor-pointer font-body text-sm text-foreground/70 transition-colors last:mb-0 hover:text-primary"
              >
                {name}
              </p>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
