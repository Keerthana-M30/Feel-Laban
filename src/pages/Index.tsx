import { useState } from "react";
import { toast } from "sonner";
import { Utensils, X } from "lucide-react";
import MenuItem from "@/components/MenuItem";
import { Button } from "@/components/ui/button";

// Shop owner's WhatsApp number (with country code, without '+')
const SHOP_OWNER_PHONE = "918144666661"; // Replace with actual number

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  icon?: string;
}

interface MenuData {
  [key: string]: CartItem;
}

// Define categories
const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "koshari", name: "KOSHARI" },
  { id: "salankatiya", name: "SALANKATIYA" },
  { id: "louah", name: "Louah" },
  { id: "quasthutah", name: "Quasthutah" },
  { id: "specials", name: "Specials" },
  { id: "shakes", name: "Shakes" },
];

const Index = () => {
  const [cart, setCart] = useState<MenuData>({
    // KOSHARI - 350
    Trio: {
      name: "KOSHARI Trio",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Pistachio Lotus": {
      name: "KOSHARI Pistachio Lotus",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Kinder Nutella": {
      name: "KOSHARI Kinder Nutella",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Pistachio Nutella": {
      name: "KOSHARI Pistachio Nutella",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },

    // SALANKATIYA - 350
    "Salankatiya Pistachio Nutella": {
      name: "SALANKATIYA Pistachio Nutella",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Salankatiya Pistachio Lotus": {
      name: "SALANKATIYA Pistachio Lotus",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Salankatiya Trio": {
      name: "SALANKATIYA Trio",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },

    // Louah - 350
    "Nutella Pistachio Kinder": {
      name: "Louah Nutella Pistachio Kinder",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Chocolate Kinder": {
      name: "Louah Chocolate Kinder",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },

    // Quasthutah - 290
    Mango: {
      name: "Quasthutah Mango",
      price: 290,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Quasthutah Pistachio Nutella": {
      name: "Quasthutah Pistachio Nutella",
      price: 290,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },

    // No category items
    Kabsa: {
      name: "Kabsa",
      price: 380,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Creme De La Creme": {
      name: "Creme De La Creme",
      price: 380,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Lazy Cat": {
      name: "Lazy Cat",
      price: 250,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Chesse Bomb": {
      name: "Chesse Bomb",
      price: 290,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Hebba Cake": {
      name: "Hebba Cake",
      price: 350,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "AI Mazia": {
      name: "AI Mazia",
      price: 250,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },

    // Shakes
    "Nutella Shake": {
      name: "Nutella",
      price: 150,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Pistachio Shake": {
      name: "Pistachio",
      price: 150,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Lotus Shake": {
      name: "Lotus",
      price: 150,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
    "Hot Chocolate": {
      name: "Hot Chocolate (250ml)",
      price: 129,
      quantity: 0,
      image: "/Feel Laban - Kinder Choclate (TV Size).png",
    },
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState("all");
  // State for cart visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateQuantity = (key: string, delta: number) => {
    setCart((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        quantity: Math.max(0, prev[key].quantity + delta),
      },
    }));
  };

  const calculateTotal = () => {
    return Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  const placeOrder = () => {
    const orderItems = Object.values(cart).filter((item) => item.quantity > 0);

    if (orderItems.length === 0) {
      toast.error("Please add items to your cart");
      return;
    }

    let message = "Hello Feel Laban! 🍨\n\n";
    message += "I would like to place the following order:\n\n";
    message += "========================\n";

    orderItems.forEach((item) => {
      message += `*${item.name}*\n`;
      message += `Qty: *${item.quantity}*\n`;
      message += `Price: ₹${item.price}\n`;
      message += `Total: ₹${(item.price * item.quantity).toFixed(2)}\n`;
      message += "--------------------------------\n";
    });

    message += `\n*GRAND TOTAL: ₹${calculateTotal().toFixed(2)}*\n`;
    message += "========================\n\n";
    message += "Please confirm my order. Thank you!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SHOP_OWNER_PHONE}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    toast.success("Opening WhatsApp to place your order!");
  };

  // Function to get items by category
  const getItemsByCategory = (category: string) => {
    switch (category) {
      case "koshari":
        return [
          "Trio",
          "Pistachio Lotus",
          "Kinder Nutella",
          "Pistachio Nutella",
        ];
      case "salankatiya":
        return [
          "Salankatiya Pistachio Nutella",
          "Salankatiya Pistachio Lotus",
          "Salankatiya Trio",
        ];
      case "louah":
        return ["Nutella Pistachio Kinder", "Chocolate Kinder"];
      case "quasthutah":
        return ["Mango", "Quasthutah Pistachio Nutella"];
      case "specials":
        return [
          "Kabsa",
          "Creme De La Creme",
          "Lazy Cat",
          "Chesse Bomb",
          "Hebba Cake",
          "AI Mazia",
        ];
      case "shakes":
        return [
          "Nutella Shake",
          "Pistachio Shake",
          "Lotus Shake",
          "Hot Chocolate",
        ];
      default:
        return Object.keys(cart);
    }
  };

  // Get items for the active tab
  const activeItems = getItemsByCategory(activeTab);

  // Get items in cart
  const cartItems = Object.values(cart).filter((item) => item.quantity > 0);
  const itemCount = getItemCount();

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden z-10">
      {/* Header with blue background, white text, glitter effect, and rounded corners */}
      <div className="sticky top-0 left-0 right-0 bg-primary z-30 relative overflow-hidden rounded-b-xl header-gradient">
        {/* Glitter effect - enhanced with variants */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent/30 rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-1/2 left-2/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent/20 rounded-full animate-pulse delay-500"></div>
          {/* Additional glitter variants */}
          <div className="absolute top-1/5 right-1/5 w-1 h-1 sm:w-1 sm:h-1 bg-white/80 rounded-full animate-ping delay-700"></div>
          <div className="absolute bottom-1/5 left-2/5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="container max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-3 relative z-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center group hover:cursor-pointer">
              <img
                src="/FL logo.png"
                alt="Feel Laban Logo"
                className="h-8 w-auto object-contain mr-2 transition-all duration-300 group-hover:scale-110 rounded-sm header-logo sm:h-10 logo-glow"
              />
              <h1 className="font-dancing-script text-xl text-primary-foreground header-title sm:text-2xl text-glow">
                Feel Laban
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Fixed active tab indicator visibility */}
      <div className="bg-card border-b border-border sticky top-16 z-20 py-0">
        <div className="container max-w-4xl mx-auto px-2 sm:px-4">
          <div
            className="flex overflow-x-auto py-2 hide-scrollbar gap-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-2 font-poppins text-sm font-medium whitespace-nowrap transition-colors duration-200 flex-shrink-0 relative ${
                  activeTab === category.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab(category.id)}
                style={{ touchAction: "manipulation" }}
              >
                {category.name}
                {activeTab === category.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 container max-w-4xl mx-auto px-2 sm:px-4 py-2 pb-28 mobile-container">
        {/* Display items based on active tab */}
        <div className="space-y-2">
          {activeItems.map((itemKey) => {
            const item = cart[itemKey];
            return (
              <MenuItem
                key={itemKey}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onAdd={() => updateQuantity(itemKey, 1)}
                onRemove={() => updateQuantity(itemKey, -1)}
                image={item.image}
              />
            );
          })}
        </div>
      </div>

      {/* Floating Cart Button - Only show when items are added */}
      {itemCount > 0 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40">
          <Button
            onClick={() => setIsCartOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-poppins font-medium px-6 py-3 text-sm rounded-full shadow-lg flex items-center gap-2"
          >
            <Utensils className="h-5 w-5" />
            <span>View Order</span>
            <span className="bg-primary-foreground text-primary rounded-full px-2 py-1 text-xs font-bold">
              {itemCount}
            </span>
          </Button>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-card rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
            {/* Cart Header */}
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <h2 className="font-poppins font-bold text-lg">Made for you</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
                className="text-primary-foreground hover:bg-primary/20"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-center border-b border-border pb-3"
                    >
                      <div>
                        <h3 className="font-poppins font-medium text-foreground">
                          {item.name}
                        </h3>
                        <p className="font-poppins text-sm text-muted-foreground">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-poppins font-bold text-foreground">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}

                  {/* Order Summary */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-poppins text-foreground">Subtotal</p>
                      <p className="font-poppins font-bold text-foreground">
                        ₹{calculateTotal()}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-poppins text-foreground">Delivery</p>
                      <p className="font-poppins font-bold text-foreground">
                        ₹0
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                      <p className="font-poppins font-bold text-lg text-foreground">
                        Total
                      </p>
                      <p className="font-poppins font-bold text-lg text-primary">
                        ₹{calculateTotal()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Your cart is empty
                </p>
              )}
            </div>

            {/* Order Button */}
            <div className="p-4 border-t border-border">
              <Button
                onClick={placeOrder}
                disabled={itemCount === 0}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-poppins font-bold py-3 text-sm rounded-lg shadow hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Order via WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border py-2 text-center text-xs text-muted-foreground z-40">
        <div className="container mx-auto px-2 sm:px-4">
          <p>
            Powered by{" "}
            <a
              href="https://EverydayAiLabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              EverydayAiLabs.com
            </a>{" "}
            | To build like this for your business reach us on{" "}
            <a
              href="tel:+917314851888"
              className="text-primary hover:underline font-medium"
            >
              +91-7314851888
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
