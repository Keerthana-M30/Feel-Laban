import { useState } from "react";
import { toast } from "sonner";
import MenuItem from "@/components/MenuItem";
import CategorySection from "@/components/CategorySection";
import CartFooter from "@/components/CartFooter";
import FloatingElements from "@/components/FloatingElements";
import VisualEffects from "@/components/VisualEffects";

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

const Index = () => {
  const [cart, setCart] = useState<MenuData>({
    // KOSHARI - 350
    Trio: { name: "KOSHARI Trio", price: 350, quantity: 0, image: "/Trio.png" },
    "Pistachio Lotus": {
      name: "KOSHARI Pistachio Lotus",
      price: 350,
      quantity: 0,
      image: "/Pistachio Lotus.png",
    },
    "Kinder Nutella": {
      name: "KOSHARI Kinder Nutella",
      price: 350,
      quantity: 0,
      image: "/Kinder Nutella.png",
    },
    "Pistachio Nutella": {
      name: "KOSHARI Pistachio Nutella",
      price: 350,
      quantity: 0,
      image: "/Pistachio Nutella.png",
    },

    // SALANKATIYA - 350
    "Salankatiya Pistachio Nutella": {
      name: "SALANKATIYA Pistachio Nutella",
      price: 350,
      quantity: 0,
      image: "/Pistachio Nutella.png",
    },
    "Salankatiya Pistachio Lotus": {
      name: "SALANKATIYA Pistachio Lotus",
      price: 350,
      quantity: 0,
      image: "/Pistachio Lotus.png",
    },
    "Salankatiya Trio": {
      name: "SALANKATIYA Trio",
      price: 350,
      quantity: 0,
      image: "/Trio.png",
    },

    // Louah - 350
    "Nutella Pistachio Kinder": {
      name: "Louah Nutella Pistachio Kinder",
      price: 350,
      quantity: 0,
      image: "/Nutella Pistachio Kinder.png",
    },
    "Chocolate Kinder": {
      name: "Louah Chocolate Kinder",
      price: 350,
      quantity: 0,
      image: "/Chocolate Kinder.png",
    },

    // Quasthutah - 290
    Mango: {
      name: "Quasthutah Mango",
      price: 290,
      quantity: 0,
      image: "/Mango.png",
    },
    "Quasthutah Pistachio Nutella": {
      name: "Quasthutah Pistachio Nutella",
      price: 290,
      quantity: 0,
      image: "/Pistachio Nutella.png",
    },

    // No category items
    Kabsa: { name: "Kabsa", price: 380, quantity: 0, image: "/Kabsa.png" },
    "Creme De La Creme": {
      name: "Creme De La Creme",
      price: 380,
      quantity: 0,
      image: "/Creme De La Creme.png",
    },
    "Lazy Cat": {
      name: "Lazy Cat",
      price: 250,
      quantity: 0,
      image: "/Lazy Cat.png",
    },
    "Chesse Bomb": {
      name: "Chesse Bomb",
      price: 290,
      quantity: 0,
      image: "/Cheese Bomb.png",
    },
    "Hebba Cake": {
      name: "Hebba Cake",
      price: 350,
      quantity: 0,
      image: "/Hebba Cake.png",
    },
    "AI Mazia": {
      name: "AI Mazia",
      price: 250,
      quantity: 0,
      image: "/AI Mazia.png",
    },

    // Shakes
    "Nutella Shake": {
      name: "Nutella",
      price: 150,
      quantity: 0,
      image: "/Nutella.png",
    },
    "Pistachio Shake": {
      name: "Pistachio",
      price: 150,
      quantity: 0,
      image: "/Pistachio.png",
    },
    "Lotus Shake": {
      name: "Lotus",
      price: 150,
      quantity: 0,
      image: "/Lotus.png",
    },
    "Hot Chocolate": {
      name: "Hot Chocolate (250ml)",
      price: 129,
      quantity: 0,
      image: "/Hot Chocolate.png",
    },
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
    <div className="min-h-screen bg-background relative overflow-x-hidden z-10">
      {/* Visual Effects Component */}
      <VisualEffects />
      <FloatingElements />

      <div className="relative z-20 container max-w-4xl mx-auto px-3 py-6 pb-20 sm:px-4 sm:py-8 sm:pb-24 md:pb-32 mobile-container">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-float">
          <h1 className="font-fredoka text-3xl sm:text-4xl md:text-7xl text-foreground mb-2 drop-shadow-2xl animate-glow">
            Feel Laban
          </h1>
          <p className="font-poppins text-base sm:text-lg text-muted-foreground">
            Order Your Favorite Delights
          </p>
        </div>

        {/* KOSHARI */}
        <CategorySection title="KOSHARI">
          <MenuItem
            name="KOSHARI Trio"
            price={350}
            quantity={cart["Trio"].quantity}
            onAdd={() => updateQuantity("Trio", 1)}
            onRemove={() => updateQuantity("Trio", -1)}
            image="/Trio.png"
          />
          <MenuItem
            name="KOSHARI Pistachio Lotus"
            price={350}
            quantity={cart["Pistachio Lotus"].quantity}
            onAdd={() => updateQuantity("Pistachio Lotus", 1)}
            onRemove={() => updateQuantity("Pistachio Lotus", -1)}
            image="/Pistachio Lotus.png"
          />
          <MenuItem
            name="KOSHARI Kinder Nutella"
            price={350}
            quantity={cart["Kinder Nutella"].quantity}
            onAdd={() => updateQuantity("Kinder Nutella", 1)}
            onRemove={() => updateQuantity("Kinder Nutella", -1)}
            image="/Kinder Nutella.png"
          />
          <MenuItem
            name="KOSHARI Pistachio Nutella"
            price={350}
            quantity={cart["Pistachio Nutella"].quantity}
            onAdd={() => updateQuantity("Pistachio Nutella", 1)}
            onRemove={() => updateQuantity("Pistachio Nutella", -1)}
            image="/Pistachio Nutella.png"
          />
        </CategorySection>

        {/* SALANKATIYA */}
        <CategorySection title="SALANKATIYA">
          <MenuItem
            name="SALANKATIYA Pistachio Nutella"
            price={350}
            quantity={cart["Salankatiya Pistachio Nutella"].quantity}
            onAdd={() => updateQuantity("Salankatiya Pistachio Nutella", 1)}
            onRemove={() => updateQuantity("Salankatiya Pistachio Nutella", -1)}
            image="/Pistachio Nutella.png"
          />
          <MenuItem
            name="SALANKATIYA Pistachio Lotus"
            price={350}
            quantity={cart["Salankatiya Pistachio Lotus"].quantity}
            onAdd={() => updateQuantity("Salankatiya Pistachio Lotus", 1)}
            onRemove={() => updateQuantity("Salankatiya Pistachio Lotus", -1)}
            image="/Pistachio Lotus.png"
          />
          <MenuItem
            name="SALANKATIYA Trio"
            price={350}
            quantity={cart["Salankatiya Trio"].quantity}
            onAdd={() => updateQuantity("Salankatiya Trio", 1)}
            onRemove={() => updateQuantity("Salankatiya Trio", -1)}
            image="/Trio.png"
          />
        </CategorySection>

        {/* Louah */}
        <CategorySection title="Louah">
          <MenuItem
            name="Louah Nutella Pistachio Kinder"
            price={350}
            quantity={cart["Nutella Pistachio Kinder"].quantity}
            onAdd={() => updateQuantity("Nutella Pistachio Kinder", 1)}
            onRemove={() => updateQuantity("Nutella Pistachio Kinder", -1)}
            image="/Nutella Pistachio Kinder.png"
          />
          <MenuItem
            name="Louah Chocolate Kinder"
            price={350}
            quantity={cart["Chocolate Kinder"].quantity}
            onAdd={() => updateQuantity("Chocolate Kinder", 1)}
            onRemove={() => updateQuantity("Chocolate Kinder", -1)}
            image="/Chocolate Kinder.png"
          />
        </CategorySection>

        {/* Quasthutah */}
        <CategorySection title="Quasthutah">
          <MenuItem
            name="Quasthutah Mango"
            price={290}
            quantity={cart["Mango"].quantity}
            onAdd={() => updateQuantity("Mango", 1)}
            onRemove={() => updateQuantity("Mango", -1)}
            image="/Mango.png"
          />
          <MenuItem
            name="Quasthutah Pistachio Nutella"
            price={290}
            quantity={cart["Quasthutah Pistachio Nutella"].quantity}
            onAdd={() => updateQuantity("Quasthutah Pistachio Nutella", 1)}
            onRemove={() => updateQuantity("Quasthutah Pistachio Nutella", -1)}
            image="/Pistachio Nutella.png"
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
            image="/Kabsa.png"
          />
          <MenuItem
            name="Creme De La Creme"
            price={380}
            quantity={cart["Creme De La Creme"].quantity}
            onAdd={() => updateQuantity("Creme De La Creme", 1)}
            onRemove={() => updateQuantity("Creme De La Creme", -1)}
            image="/Creme De La Creme.png"
          />
          <MenuItem
            name="Lazy Cat"
            price={250}
            quantity={cart["Lazy Cat"].quantity}
            onAdd={() => updateQuantity("Lazy Cat", 1)}
            onRemove={() => updateQuantity("Lazy Cat", -1)}
            image="/Lazy Cat.png"
          />
          <MenuItem
            name="Chesse Bomb"
            price={290}
            quantity={cart["Chesse Bomb"].quantity}
            onAdd={() => updateQuantity("Chesse Bomb", 1)}
            onRemove={() => updateQuantity("Chesse Bomb", -1)}
            image="/Cheese Bomb.png"
          />
          <MenuItem
            name="Hebba Cake"
            price={350}
            quantity={cart["Hebba Cake"].quantity}
            onAdd={() => updateQuantity("Hebba Cake", 1)}
            onRemove={() => updateQuantity("Hebba Cake", -1)}
            image="/Hebba Cake.png"
          />
          <MenuItem
            name="AI Mazia"
            price={250}
            quantity={cart["AI Mazia"].quantity}
            onAdd={() => updateQuantity("AI Mazia", 1)}
            onRemove={() => updateQuantity("AI Mazia", -1)}
            image="/AI Mazia.png"
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
            image="/Nutella.png"
          />
          <MenuItem
            name="Pistachio"
            price={150}
            quantity={cart["Pistachio Shake"].quantity}
            onAdd={() => updateQuantity("Pistachio Shake", 1)}
            onRemove={() => updateQuantity("Pistachio Shake", -1)}
            image="/Pistachio.png"
          />
          <MenuItem
            name="Lotus"
            price={150}
            quantity={cart["Lotus Shake"].quantity}
            onAdd={() => updateQuantity("Lotus Shake", 1)}
            onRemove={() => updateQuantity("Lotus Shake", -1)}
            image="/Lotus.png"
          />
          <MenuItem
            name="Hot Chocolate (250ml)"
            price={129}
            quantity={cart["Hot Chocolate"].quantity}
            onAdd={() => updateQuantity("Hot Chocolate", 1)}
            onRemove={() => updateQuantity("Hot Chocolate", -1)}
            image="/Hot Chocolate.png"
          />
        </CategorySection>
      </div>

      <CartFooter
        total={calculateTotal()}
        onPlaceOrder={placeOrder}
        itemCount={getItemCount()}
      />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-primary/20 py-2 text-center text-xs text-muted-foreground z-40">
        <div className="container mx-auto px-3 sm:px-4">
          <p>
            Powered by{" "}
            <a
              href="https://EverydayAiLabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              EverydayAiLabs.com
            </a>{" "}
            | To build like this for your business reach us on{" "}
            <a
              href="tel:+917314851888"
              className="text-accent hover:underline font-medium"
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
