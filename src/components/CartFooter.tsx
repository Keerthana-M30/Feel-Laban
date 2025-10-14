import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

interface CartFooterProps {
  total: number;
  onPlaceOrder: () => void;
  itemCount: number;
}

const CartFooter = ({ total, onPlaceOrder, itemCount }: CartFooterProps) => {
  return (
    <div className="fixed bottom-12 left-0 right-0 bg-card/95 backdrop-blur-lg border-t-2 border-accent shadow-2xl z-50">
      <div className="container max-w-4xl mx-auto px-3 py-2 sm:px-4 sm:py-4 mobile-container">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="text-center sm:text-left">
            <p className="font-poppins text-xs sm:text-sm text-muted-foreground">
              Total Amount
            </p>
            <p className="font-fredoka text-xl sm:text-2xl text-accent animate-glow mobile-small-text">
              ₹{total}
            </p>
          </div>

          <Button
            onClick={onPlaceOrder}
            disabled={itemCount === 0}
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-poppins font-bold px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-bounce"
          >
            <MessageCircle className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Place Order</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
