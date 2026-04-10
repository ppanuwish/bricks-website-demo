import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BlogList } from "../components/BlogList";
import { BlogMenu, menuItems, type BlogCategory } from "../components/BlogMenu";
import { goToBlogPost } from "../lib/navigation";

function categoryFromSearchParam(raw: string | null): BlogCategory {
  if (!raw) return "All category";
  if (menuItems.includes(raw as BlogCategory)) return raw as BlogCategory;
  return "All category";
}

export function BlogPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState<BlogCategory>(() =>
    categoryFromSearchParam(categoryParam),
  );

  useEffect(() => {
    setActiveCategory(categoryFromSearchParam(categoryParam));
  }, [categoryParam]);

  return (
    <div className="bg-[#ececec] px-8 pb-16 pt-[110px] md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-[1280px]">
        <h1 className="mb-7 font-heading text-[clamp(38px,5.2vw,68px)] font-extrabold leading-[1.06] tracking-[-2.5px] text-bricks-darkgray">
          Blog
        </h1>
        <BlogMenu
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <BlogList
          showHeading={false}
          showCategoryMenu={false}
          omitOuterContainer
          activeCategory={activeCategory}
          onCardClick={(post) => goToBlogPost((to) => navigate(to), post)}
        />
      </div>
    </div>
  );
}
