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
      <div className="container max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="font-poppins text-sm text-muted-foreground">
              Total Amount
            </p>
            <p className="font-fredoka text-3xl text-accent animate-glow">
              ₹{total}
            </p>
          </div>
          
          <Button
            onClick={onPlaceOrder}
            disabled={itemCount === 0}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-poppins font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-bounce"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
