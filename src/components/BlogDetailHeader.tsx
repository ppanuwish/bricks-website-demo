type BlogDetailHeaderProps = {
  category: string;
};

export function BlogDetailHeader({ category }: BlogDetailHeaderProps) {
  return (
    <div className="bg-[#ff3f46] px-6 py-14 md:px-16 md:py-16">
      <h1 className="font-heading text-[clamp(42px,5.6vw,72px)] font-extrabold leading-[1] text-white">
        {category}
      </h1>
    </div>
  );
}
