import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";

interface MenuItemProps {
  name: string;
  price: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  icon?: string;
}

const MenuItem = ({ name, price, quantity, onAdd, onRemove, icon }: MenuItemProps) => {
  return (
    <div className="bg-card backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-primary/20">
      <div className="flex justify-between items-center gap-4">
        {icon && (
          <div className="text-4xl flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-poppins font-semibold text-foreground text-lg">
            {name}
          </h3>
          <p className="font-poppins text-accent text-xl font-bold mt-1">
            ₹{price}
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-primary/10 rounded-full px-2 py-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={onRemove}
            disabled={quantity === 0}
            className="h-8 w-8 rounded-full hover:bg-secondary transition-all disabled:opacity-30"
          >
            <Minus className="h-4 w-4 text-foreground" />
          </Button>
          
          <span className="font-poppins font-bold text-foreground text-lg min-w-[2rem] text-center">
            {quantity}
          </span>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={onAdd}
            className="h-8 w-8 rounded-full hover:bg-secondary transition-all hover:scale-110"
          >
            <Plus className="h-4 w-4 text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
