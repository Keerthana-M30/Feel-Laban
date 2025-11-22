import { ReactNode } from "react";

interface CategorySectionProps {
  title: string;
  children: ReactNode;
}

const CategorySection = ({ title, children }: CategorySectionProps) => {
  return (
    <div className="mb-8 mobile-section">
      <h2 className="font-fredoka text-xl text-primary mb-4 text-left pl-1 category-section-title">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default CategorySection;
