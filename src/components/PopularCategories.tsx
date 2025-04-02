
import { Card } from "@/components/ui/card";
import { Brain, Server, Lock } from "lucide-react";

interface PopularCategoriesProps {
  onSelectCategory: (category: string) => void;
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: "fundamentals",
      title: "AI Fundamentals",
      icon: <div className="w-12 h-12 flex items-center justify-center text-blue-500 bg-blue-100 rounded-lg"><Brain className="h-7 w-7" /></div>,
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      id: "machine learning",
      title: "Machine Learning",
      icon: <div className="w-12 h-12 flex items-center justify-center text-pink-500 bg-pink-100 rounded-lg"><Brain className="h-7 w-7" /></div>,
      color: "bg-pink-50 hover:bg-pink-100"
    },
    {
      id: "cloud computing",
      title: "Cloud Computing",
      icon: <div className="w-12 h-12 flex items-center justify-center text-teal-500 bg-teal-100 rounded-lg"><Server className="h-7 w-7" /></div>,
      color: "bg-teal-50 hover:bg-teal-100"
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      icon: <div className="w-12 h-12 flex items-center justify-center text-amber-500 bg-amber-100 rounded-lg"><Lock className="h-7 w-7" /></div>,
      color: "bg-amber-50 hover:bg-amber-100"
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(category => (
          <Card 
            key={category.id}
            className={`${category.color} border-none p-4 cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[120px] text-center`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.icon}
            <h3 className="mt-3 font-medium">{category.title}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
