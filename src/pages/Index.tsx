import { useState } from "react";
import { toast } from "sonner";
import MenuItem from "@/components/MenuItem";
import CategorySection from "@/components/CategorySection";
import CartFooter from "@/components/CartFooter";
import FloatingElements from "@/components/FloatingElements";

// Shop owner's WhatsApp number (with country code, without '+')
const SHOP_OWNER_PHONE = "918144666661"; // Replace with actual number

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  icon?: string;
}

interface MenuData {
  [key: string]: CartItem;
}

const Index = () => {
  const [cart, setCart] = useState<MenuData>({
    // KOSHARI - 350
    "Trio": { name: "Trio", price: 350, quantity: 0, icon: "🍨" },
    "Pistachio Lotus": { name: "Pistachio Lotus", price: 350, quantity: 0, icon: "🥜" },
    "Kinder Nutella": { name: "Kinder Nutella", price: 350, quantity: 0, icon: "🍫" },
    "Pistachio Nutella": { name: "Pistachio Nutella", price: 350, quantity: 0, icon: "🌰" },
    
    // SALANKATIYA - 350
    "Salankatiya Pistachio Nutella": { name: "Pistachio Nutella", price: 350, quantity: 0, icon: "🌰" },
    "Salankatiya Pistachio Lotus": { name: "Pistachio Lotus", price: 350, quantity: 0, icon: "🥜" },
    "Salankatiya Trio": { name: "Trio", price: 350, quantity: 0, icon: "🍨" },
    
    // Louah - 350
    "Nutella Pistachio Kinder": { name: "Nutella Pistachio Kinder", price: 350, quantity: 0, icon: "🍫" },
    "Chocolate Kinder": { name: "Chocolate Kinder", price: 350, quantity: 0, icon: "🍬" },
    
    // Quasthutah - 290
    "Mango": { name: "Mango", price: 290, quantity: 0, icon: "🥭" },
    "Quasthutah Pistachio Nutella": { name: "Pistachio Nutella", price: 290, quantity: 0, icon: "🌰" },
    
    // No category items
    "Kabsa": { name: "Kabsa", price: 380, quantity: 0, icon: "🍛" },
    "Creme De La Creme": { name: "Creme De La Creme", price: 380, quantity: 0, icon: "🍰" },
    "Lazy Cat": { name: "Lazy Cat", price: 250, quantity: 0, icon: "😸" },
    "Chesse Bomb": { name: "Chesse Bomb", price: 290, quantity: 0, icon: "💣" },
    "Hebba Cake": { name: "Hebba Cake", price: 350, quantity: 0, icon: "🎂" },
    "AI Mazia": { name: "AI Mazia", price: 250, quantity: 0, icon: "🍮" },
    
    // Shakes
    "Nutella Shake": { name: "Nutella", price: 150, quantity: 0, icon: "🥤" },
    "Pistachio Shake": { name: "Pistachio", price: 150, quantity: 0, icon: "🥤" },
    "Lotus Shake": { name: "Lotus", price: 150, quantity: 0, icon: "🥤" },
    "Hot Chocolate": { name: "Hot Chocolate (250ml)", price: 129, quantity: 0, icon: "☕" },
  });

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

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingElements />
      
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8 pb-48">
        {/* Header */}
        <div className="text-center mb-12 animate-float">
          <h1 className="font-fredoka text-5xl md:text-7xl text-foreground mb-2 drop-shadow-2xl animate-glow">
            Feel Laban
          </h1>
          <p className="font-poppins text-xl text-muted-foreground">
            Order Your Favorite Delights
          </p>
        </div>

        {/* KOSHARI */}
        <CategorySection title="KOSHARI">
          <MenuItem
            name="Trio"
            price={350}
            quantity={cart["Trio"].quantity}
            onAdd={() => updateQuantity("Trio", 1)}
            onRemove={() => updateQuantity("Trio", -1)}
            icon={cart["Trio"].icon}
          />
          <MenuItem
            name="Pistachio Lotus"
            price={350}
            quantity={cart["Pistachio Lotus"].quantity}
            onAdd={() => updateQuantity("Pistachio Lotus", 1)}
            onRemove={() => updateQuantity("Pistachio Lotus", -1)}
            icon={cart["Pistachio Lotus"].icon}
          />
          <MenuItem
            name="Kinder Nutella"
            price={350}
            quantity={cart["Kinder Nutella"].quantity}
            onAdd={() => updateQuantity("Kinder Nutella", 1)}
            onRemove={() => updateQuantity("Kinder Nutella", -1)}
            icon={cart["Kinder Nutella"].icon}
          />
          <MenuItem
            name="Pistachio Nutella"
            price={350}
            quantity={cart["Pistachio Nutella"].quantity}
            onAdd={() => updateQuantity("Pistachio Nutella", 1)}
            onRemove={() => updateQuantity("Pistachio Nutella", -1)}
            icon={cart["Pistachio Nutella"].icon}
          />
        </CategorySection>

        {/* SALANKATIYA */}
        <CategorySection title="SALANKATIYA">
          <MenuItem
            name="Pistachio Nutella"
            price={350}
            quantity={cart["Salankatiya Pistachio Nutella"].quantity}
            onAdd={() => updateQuantity("Salankatiya Pistachio Nutella", 1)}
            onRemove={() => updateQuantity("Salankatiya Pistachio Nutella", -1)}
            icon={cart["Salankatiya Pistachio Nutella"].icon}
          />
          <MenuItem
            name="Pistachio Lotus"
            price={350}
            quantity={cart["Salankatiya Pistachio Lotus"].quantity}
            onAdd={() => updateQuantity("Salankatiya Pistachio Lotus", 1)}
            onRemove={() => updateQuantity("Salankatiya Pistachio Lotus", -1)}
            icon={cart["Salankatiya Pistachio Lotus"].icon}
          />
          <MenuItem
            name="Trio"
            price={350}
            quantity={cart["Salankatiya Trio"].quantity}
            onAdd={() => updateQuantity("Salankatiya Trio", 1)}
            onRemove={() => updateQuantity("Salankatiya Trio", -1)}
            icon={cart["Salankatiya Trio"].icon}
          />
        </CategorySection>

        {/* Louah */}
        <CategorySection title="Louah">
          <MenuItem
            name="Nutella Pistachio Kinder"
            price={350}
            quantity={cart["Nutella Pistachio Kinder"].quantity}
            onAdd={() => updateQuantity("Nutella Pistachio Kinder", 1)}
            onRemove={() => updateQuantity("Nutella Pistachio Kinder", -1)}
            icon={cart["Nutella Pistachio Kinder"].icon}
          />
          <MenuItem
            name="Chocolate Kinder"
            price={350}
            quantity={cart["Chocolate Kinder"].quantity}
            onAdd={() => updateQuantity("Chocolate Kinder", 1)}
            onRemove={() => updateQuantity("Chocolate Kinder", -1)}
            icon={cart["Chocolate Kinder"].icon}
          />
        </CategorySection>

        {/* Quasthutah */}
        <CategorySection title="Quasthutah">
          <MenuItem
            name="Mango"
            price={290}
            quantity={cart["Mango"].quantity}
            onAdd={() => updateQuantity("Mango", 1)}
            onRemove={() => updateQuantity("Mango", -1)}
            icon={cart["Mango"].icon}
          />
          <MenuItem
            name="Pistachio Nutella"
            price={290}
            quantity={cart["Quasthutah Pistachio Nutella"].quantity}
            onAdd={() => updateQuantity("Quasthutah Pistachio Nutella", 1)}
            onRemove={() => updateQuantity("Quasthutah Pistachio Nutella", -1)}
            icon={cart["Quasthutah Pistachio Nutella"].icon}
          />
        </CategorySection>

        {/* Specials */}
        <CategorySection title="Specials">
          <MenuItem
            name="Kabsa"
            price={380}
            quantity={cart["Kabsa"].quantity}
            onAdd={() => updateQuantity("Kabsa", 1)}
            onRemove={() => updateQuantity("Kabsa", -1)}
            icon={cart["Kabsa"].icon}
          />
          <MenuItem
            name="Creme De La Creme"
            price={380}
            quantity={cart["Creme De La Creme"].quantity}
            onAdd={() => updateQuantity("Creme De La Creme", 1)}
            onRemove={() => updateQuantity("Creme De La Creme", -1)}
            icon={cart["Creme De La Creme"].icon}
          />
          <MenuItem
            name="Lazy Cat"
            price={250}
            quantity={cart["Lazy Cat"].quantity}
            onAdd={() => updateQuantity("Lazy Cat", 1)}
            onRemove={() => updateQuantity("Lazy Cat", -1)}
            icon={cart["Lazy Cat"].icon}
          />
          <MenuItem
            name="Chesse Bomb"
            price={290}
            quantity={cart["Chesse Bomb"].quantity}
            onAdd={() => updateQuantity("Chesse Bomb", 1)}
            onRemove={() => updateQuantity("Chesse Bomb", -1)}
            icon={cart["Chesse Bomb"].icon}
          />
          <MenuItem
            name="Hebba Cake"
            price={350}
            quantity={cart["Hebba Cake"].quantity}
            onAdd={() => updateQuantity("Hebba Cake", 1)}
            onRemove={() => updateQuantity("Hebba Cake", -1)}
            icon={cart["Hebba Cake"].icon}
          />
          <MenuItem
            name="AI Mazia"
            price={250}
            quantity={cart["AI Mazia"].quantity}
            onAdd={() => updateQuantity("AI Mazia", 1)}
            onRemove={() => updateQuantity("AI Mazia", -1)}
            icon={cart["AI Mazia"].icon}
          />
        </CategorySection>

        {/* Shakes */}
        <CategorySection title="Shakes">
          <MenuItem
            name="Nutella"
            price={150}
            quantity={cart["Nutella Shake"].quantity}
            onAdd={() => updateQuantity("Nutella Shake", 1)}
            onRemove={() => updateQuantity("Nutella Shake", -1)}
            icon={cart["Nutella Shake"].icon}
          />
          <MenuItem
            name="Pistachio"
            price={150}
            quantity={cart["Pistachio Shake"].quantity}
            onAdd={() => updateQuantity("Pistachio Shake", 1)}
            onRemove={() => updateQuantity("Pistachio Shake", -1)}
            icon={cart["Pistachio Shake"].icon}
          />
          <MenuItem
            name="Lotus"
            price={150}
            quantity={cart["Lotus Shake"].quantity}
            onAdd={() => updateQuantity("Lotus Shake", 1)}
            onRemove={() => updateQuantity("Lotus Shake", -1)}
            icon={cart["Lotus Shake"].icon}
          />
          <MenuItem
            name="Hot Chocolate (250ml)"
            price={129}
            quantity={cart["Hot Chocolate"].quantity}
            onAdd={() => updateQuantity("Hot Chocolate", 1)}
            onRemove={() => updateQuantity("Hot Chocolate", -1)}
            icon={cart["Hot Chocolate"].icon}
          />
        </CategorySection>
      </div>

      <CartFooter
        total={calculateTotal()}
        onPlaceOrder={placeOrder}
        itemCount={getItemCount()}
      />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-primary/20 py-3 text-center text-sm text-muted-foreground z-40">
        <div className="container mx-auto px-4">
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
