import { Fade } from "./Fade";

export const menuItems = [
  "All category",
  "Case studies",
  "Utillities",
  "Technology",
  "Platform update",
  "News",
  "Events",
  "Clients",
] as const;

export type BlogCategory = (typeof menuItems)[number];

type BlogMenuProps = {
  activeCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
};

export function BlogMenu({ activeCategory, onSelectCategory }: BlogMenuProps) {
  return (
    <Fade d={20}>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {menuItems.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelectCategory(item)}
            className={`h-9 px-2.5 font-body text-[14px] font-semibold leading-5 ${
              activeCategory === item
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-foreground hover:text-primary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </Fade>
  );
}
