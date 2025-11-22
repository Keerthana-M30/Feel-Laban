import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";

interface MenuItemProps {
  name: string;
  price: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  image?: string;
  icon?: string;
}

const MenuItem = ({
  name,
  price,
  quantity,
  onAdd,
  onRemove,
  image,
  icon,
}: MenuItemProps) => {
  return (
    <div className="bg-card rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-border mobile-item-padding menu-item-card">
      <div className="flex gap-3">
        {image ? (
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-28 h-20 object-cover rounded-md mobile-image-large"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        ) : icon ? (
          <div className="text-2xl flex-shrink-0">{icon}</div>
        ) : null}

        <div className="flex-1 min-w-0">
          <h3 className="font-poppins font-medium text-foreground text-xs mobile-small-text truncate">
            {name}
          </h3>
          <p className="font-poppins text-primary text-sm font-bold mt-1 mobile-small-text">
            ₹{price}
          </p>

          <div className="mt-2">
            {quantity > 0 ? (
              <div className="flex items-center gap-2 bg-muted rounded-full px-2 py-1 mobile-quantity-controls w-fit">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onRemove}
                  className="h-5 w-5 rounded-full hover:bg-secondary/10 transition-all text-foreground"
                >
                  <Minus className="h-2.5 w-2.5 text-primary" />
                </Button>

                <span className="font-poppins font-bold text-foreground text-xs min-w-[1.25rem] text-center mobile-quantity-span">
                  {quantity}
                </span>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onAdd}
                  className="h-5 w-5 rounded-full hover:bg-secondary/10 transition-all text-foreground"
                >
                  <Plus className="h-2.5 w-2.5 text-primary" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={onAdd}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-poppins font-medium px-3 py-1 text-xs rounded-full h-6"
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
