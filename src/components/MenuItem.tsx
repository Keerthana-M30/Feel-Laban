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
    <div className="bg-card backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-primary/20 mobile-item-padding">
      <div className="flex justify-between items-center gap-2">
        {image ? (
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-12 h-12 object-contain rounded-lg mobile-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        ) : icon ? (
          <div className="text-3xl flex-shrink-0">{icon}</div>
        ) : null}
        <div className="flex-1 min-w-0">
          <h3 className="font-poppins font-semibold text-foreground text-sm mobile-small-text truncate">
            {name}
          </h3>
          <p className="font-poppins text-accent text-base font-bold mt-1 mobile-small-text">
            ₹{price}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-primary/10 rounded-full px-1 py-1 mobile-quantity-controls">
          <Button
            size="icon"
            variant="ghost"
            onClick={onRemove}
            disabled={quantity === 0}
            className="h-6 w-6 rounded-full hover:bg-secondary transition-all disabled:opacity-30 mobile-button-small mobile-button-xsmall"
          >
            <Minus className="h-3 w-3 text-foreground mobile-icon-small mobile-icon-xsmall" />
          </Button>

          <span className="font-poppins font-bold text-foreground text-sm min-w-[1.5rem] text-center mobile-quantity-span">
            {quantity}
          </span>

          <Button
            size="icon"
            variant="ghost"
            onClick={onAdd}
            className="h-6 w-6 rounded-full hover:bg-secondary transition-all hover:scale-105 mobile-button-small mobile-button-xsmall"
          >
            <Plus className="h-3 w-3 text-foreground mobile-icon-small mobile-icon-xsmall" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
