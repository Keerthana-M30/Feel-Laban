import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Bell,
  ChevronRight,
  Heart,
  MessageCircle,
  Utensils,
  X,
} from "lucide-react";
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
  { id: "louah", name: "LOUAH" },
  { id: "qashtutah", name: "QASHTUTAH" },
  { id: "specials", name: "SPECIALS" },
  { id: "shakes", name: "SHAKES" },
];

const Index = () => {
  const [cart, setCart] = useState<MenuData>({
    // KOSHARI - 350
    Trio: {
      name: "KOSHARI Trio",
      price: 350,
      quantity: 0,
      image: "/Trio.jpg",
    },
    "Pistachio Lotus": {
      name: "KOSHARI Pistachio Lotus",
      price: 350,
      quantity: 0,
      image: "/Pistachio Lotus.jpg",
    },
    "Kinder Nutella": {
      name: "KOSHARI Kinder Nutella",
      price: 350,
      quantity: 0,
      image: "/Kinder Nutella.jpg",
    },
    "Pistachio Nutella": {
      name: "KOSHARI Pistachio Nutella",
      price: 350,
      quantity: 0,
      image: "/Pistachio Nutella.jpg",
    },

    // SALANKATIYA - 350
    "Salankatiya Pistachio Nutella": {
      name: "SALANKATIYA Pistachio Nutella",
      price: 350,
      quantity: 0,
      image: "/Pistachio Nutella.jpg",
    },
    "Salankatiya Pistachio Lotus": {
      name: "SALANKATIYA Pistachio Lotus",
      price: 350,
      quantity: 0,
      image: "/Pistachio Lotus.jpg",
    },
    "Salankatiya Trio": {
      name: "SALANKATIYA Trio",
      price: 350,
      quantity: 0,
      image: "/Trio.jpg",
    },

    // Louah - 350
    "Nutella Pistachio Kinder": {
      name: "LOUAH Nutella Pistachio Kinder",
      price: 350,
      quantity: 0,
      image: "/Nutella Pistachio Kinder.jpg",
    },
    "Chocolate Kinder": {
      name: "LOUAH Chocolate Kinder",
      price: 350,
      quantity: 0,
      image: "/Chocolate Kinder.jpg",
    },

    // Qashtutah - 290
    Mango: {
      name: "QASHTUTAH Mango",
      price: 290,
      quantity: 0,
      image: "/Mango.jpg",
    },
    "Qashtutah Pistachio Nutella": {
      name: "QASHTUTAH Pistachio Nutella",
      price: 290,
      quantity: 0,
      image: "/Pistachio Nutella.jpg",
    },

    // No category items
    Kabsa: {
      name: "Kabsa",
      price: 380,
      quantity: 0,
      image: "/Kabsa.jpg",
    },
    "Creme De La Creme": {
      name: "Creme De La Creme",
      price: 380,
      quantity: 0,
      image: "/Creme de la  Creme.jpg",
    },
    "Lazy Cat": {
      name: "Lazy Cat",
      price: 250,
      quantity: 0,
      image: "/Lazy cat.jpg",
    },
    "Cheese Bomb": {
      name: "Cheese Bomb",
      price: 290,
      quantity: 0,
      image: "/Cheese Bomb.jpg",
    },
    "Hebba Cake": {
      name: "Hebba Cake",
      price: 350,
      quantity: 0,
      image: "/Hebba Cake.jpg",
    },
    "AI Mazia": {
      name: "AI Mazia",
      price: 250,
      quantity: 0,
      image: "/AI Mazia.jpg",
    },

    // Shakes
    "Nutella Shake": {
      name: "Nutella",
      price: 150,
      quantity: 0,
      image: "/Nutella.jpg",
    },
    "Pistachio Shake": {
      name: "Pistachio",
      price: 150,
      quantity: 0,
      image: "/Pistachio.jpg",
    },
    "Lotus Shake": {
      name: "Lotus",
      price: 150,
      quantity: 0,
      image: "/Lotus.jpg",
    },
    "Hot Chocolate": {
      name: "Hot Chocolate (250ml)",
      price: 129,
      quantity: 0,
      image: "/Hot Chocolate.jpg",
    },
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState("all");
  // State for cart visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  // State for customer name
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    // Prevent background scrolling when cart is open
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

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

  const [nameError, setNameError] = useState(false);

  const sendOrderToEndpoint = async (orderData: any) => {
    try {
      const response = await fetch("https://savetron.2440066.xyz/laban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order sent successfully:", result);
      toast.success("Order details sent to server");
      return true;
    } catch (error) {
      console.error("Error sending order to endpoint:", error);
      // Even if we can't send to the endpoint due to CORS or other issues,
      // we should still allow the user to proceed with WhatsApp
      toast.warning(
        "Could not save order to server, but proceeding with WhatsApp"
      );
      return true; // Return true to continue with WhatsApp flow
    }
  };

  const placeOrder = async () => {
    const orderItems = Object.values(cart).filter((item) => item.quantity > 0);

    if (orderItems.length === 0) {
      toast.error("Please add items to your cart");
      return;
    }

    // Check if customer name is provided
    if (!customerName.trim()) {
      setNameError(true);
      return;
    }

    // Prepare data for the endpoint
    const orderData = {
      customer_name: customerName,
      items: orderItems.map((item) => ({
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      grand_total: calculateTotal(),
      currency: "INR",
      status: "pending_confirmation",
    };

    // Send order to endpoint first (non-blocking)
    sendOrderToEndpoint(orderData);

    // Continue immediately with WhatsApp flow without waiting
    let message = `Hello Feel Laban! 🍨

Customer Name: ${customerName}

`;
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
      case "qashtutah":
        return ["Mango", "Qashtutah Pistachio Nutella"];
      case "specials":
        return [
          "Kabsa",
          "Creme De La Creme",
          "Lazy Cat",
          "Cheese Bomb",
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
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md">
          <Button
            onClick={() => setIsCartOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-poppins font-medium px-6 py-3 text-sm rounded-lg shadow-lg flex items-center justify-between w-full transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              <span>View Order</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-primary-foreground text-primary rounded-full px-2 py-1 text-xs font-bold">
                {itemCount}
              </span>
              <ChevronRight className="h-5 w-5" />
            </div>
          </Button>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
            {/* Cart Header */}
            <div className="bg-card text-primary-foreground p-4 flex justify-between items-center border-b border-border">
              <h2 className="font-poppins font-bold text-lg flex items-center gap-2 text-primary">
                <Heart className="h-5 w-5 text-primary" />
                <span>Made for You !</span>
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
                className="text-primary hover:bg-primary/20"
              >
                <X className="h-6 w-6 text-primary" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="font-poppins font-bold text-lg text-foreground border-b border-blue-200 pb-2">
                    Your Order
                  </h2>

                  {cartItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="font-poppins font-medium text-foreground">
                          {item.name}
                        </h3>
                        <p className="font-poppins text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-poppins text-sm text-muted-foreground">
                          ₹{item.price} × {item.quantity}
                        </p>
                        <p className="font-poppins font-bold text-foreground">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Customer Name Input */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-4 w-4 text-primary" />
                      <label className="font-poppins text-sm text-foreground font-bold">
                        Name required for Ordering*
                      </label>
                    </div>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (nameError && e.target.value.trim()) {
                          setNameError(false);
                        }
                      }}
                      placeholder="Enter your name"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        nameError ? "border-red-500" : "border-gray-400"
                      }`}
                      required
                    />
                    {nameError && (
                      <p className="mt-1 text-sm text-red-500">
                        Please enter your name for ordering
                      </p>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-4 bg-blue-50 rounded-lg p-3">
                    <h3 className="font-poppins font-bold text-center text-foreground mb-2">
                      Order Summary
                    </h3>

                    <div className="flex justify-between items-center mb-1">
                      <p className="font-poppins text-foreground">Item Total</p>
                      <p className="font-poppins font-bold text-foreground">
                        ₹{calculateTotal()}
                      </p>
                    </div>

                    <div className="border-t border-border my-2"></div>

                    <div className="flex justify-between items-center">
                      <p className="font-poppins font-bold text-foreground">
                        Total
                      </p>
                      <p className="font-poppins font-bold text-primary">
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-poppins font-bold py-3 text-sm rounded-lg shadow hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed relative"
              >
                <div className="absolute -inset-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-300 opacity-30 blur"></div>
                <span className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Order via WhatsApp
                </span>
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
