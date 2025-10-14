import { ReactNode } from "react";

interface CategorySectionProps {
  title: string;
  children: ReactNode;
}

const CategorySection = ({ title, children }: CategorySectionProps) => {
  return (
    <div className="mb-10">
      <h2 className="font-fredoka text-3xl md:text-4xl text-accent mb-6 text-center animate-float">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default CategorySection;
