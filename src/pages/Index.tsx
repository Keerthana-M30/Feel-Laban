import { useState } from "react";
import { toast } from "sonner";
import MenuItem from "@/components/MenuItem";
import CategorySection from "@/components/CategorySection";
import CartFooter from "@/components/CartFooter";
import FloatingElements from "@/components/FloatingElements";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface MenuData {
  [key: string]: CartItem;
}

const Index = () => {
  const [cart, setCart] = useState<MenuData>({
    // KOSHARI - 350
    "Trio": { name: "Trio", price: 350, quantity: 0 },
    "Pistachio Lotus": { name: "Pistachio Lotus", price: 350, quantity: 0 },
    "Kinder Nutella": { name: "Kinder Nutella", price: 350, quantity: 0 },
    "Pistachio Nutella": { name: "Pistachio Nutella", price: 350, quantity: 0 },
    
    // SALANKATIYA - 350
    "Salankatiya Pistachio Nutella": { name: "Pistachio Nutella", price: 350, quantity: 0 },
    "Salankatiya Pistachio Lotus": { name: "Pistachio Lotus", price: 350, quantity: 0 },
    "Salankatiya Trio": { name: "Trio", price: 350, quantity: 0 },
    
    // Louah - 350
    "Nutella Pistachio Kinder": { name: "Nutella Pistachio Kinder", price: 350, quantity: 0 },
    "Chocolate Kinder": { name: "Chocolate Kinder", price: 350, quantity: 0 },
    
    // Quasthutah - 290
    "Mango": { name: "Mango", price: 290, quantity: 0 },
    "Quasthutah Pistachio Nutella": { name: "Pistachio Nutella", price: 290, quantity: 0 },
    
    // No category items
    "Kabsa": { name: "Kabsa", price: 380, quantity: 0 },
    "Creme De La Creme": { name: "Creme De La Creme", price: 380, quantity: 0 },
    "Lazy Cat": { name: "Lazy Cat", price: 250, quantity: 0 },
    "Chesse Bomb": { name: "Chesse Bomb", price: 290, quantity: 0 },
    "Hebba Cake": { name: "Hebba Cake", price: 350, quantity: 0 },
    "AI Mazia": { name: "AI Mazia", price: 250, quantity: 0 },
    
    // Shakes
    "Nutella Shake": { name: "Nutella", price: 150, quantity: 0 },
    "Pistachio Shake": { name: "Pistachio", price: 150, quantity: 0 },
    "Lotus Shake": { name: "Lotus", price: 150, quantity: 0 },
    "Hot Chocolate": { name: "Hot Chocolate (250ml)", price: 129, quantity: 0 },
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

    let message = "🍽️ *New Order from Feel Laban*\n\n";
    orderItems.forEach((item) => {
      message += `${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n`;
    });
    message += `\n*Total: ₹${calculateTotal()}*`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Opening WhatsApp to place your order!");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingElements />
      
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8 pb-32">
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
          />
          <MenuItem
            name="Pistachio Lotus"
            price={350}
            quantity={cart["Pistachio Lotus"].quantity}
            onAdd={() => updateQuantity("Pistachio Lotus", 1)}
            onRemove={() => updateQuantity("Pistachio Lotus", -1)}
          />
          <MenuItem
            name="Kinder Nutella"
            price={350}
            quantity={cart["Kinder Nutella"].quantity}
            onAdd={() => updateQuantity("Kinder Nutella", 1)}
            onRemove={() => updateQuantity("Kinder Nutella", -1)}
          />
          <MenuItem
            name="Pistachio Nutella"
            price={350}
            quantity={cart["Pistachio Nutella"].quantity}
            onAdd={() => updateQuantity("Pistachio Nutella", 1)}
            onRemove={() => updateQuantity("Pistachio Nutella", -1)}
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
          />
          <MenuItem
            name="Pistachio Lotus"
            price={350}
            quantity={cart["Salankatiya Pistachio Lotus"].quantity}
            onAdd={() => updateQuantity("Salankatiya Pistachio Lotus", 1)}
            onRemove={() => updateQuantity("Salankatiya Pistachio Lotus", -1)}
          />
          <MenuItem
            name="Trio"
            price={350}
            quantity={cart["Salankatiya Trio"].quantity}
            onAdd={() => updateQuantity("Salankatiya Trio", 1)}
            onRemove={() => updateQuantity("Salankatiya Trio", -1)}
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
          />
          <MenuItem
            name="Chocolate Kinder"
            price={350}
            quantity={cart["Chocolate Kinder"].quantity}
            onAdd={() => updateQuantity("Chocolate Kinder", 1)}
            onRemove={() => updateQuantity("Chocolate Kinder", -1)}
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
          />
          <MenuItem
            name="Pistachio Nutella"
            price={290}
            quantity={cart["Quasthutah Pistachio Nutella"].quantity}
            onAdd={() => updateQuantity("Quasthutah Pistachio Nutella", 1)}
            onRemove={() => updateQuantity("Quasthutah Pistachio Nutella", -1)}
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
          />
          <MenuItem
            name="Creme De La Creme"
            price={380}
            quantity={cart["Creme De La Creme"].quantity}
            onAdd={() => updateQuantity("Creme De La Creme", 1)}
            onRemove={() => updateQuantity("Creme De La Creme", -1)}
          />
          <MenuItem
            name="Lazy Cat"
            price={250}
            quantity={cart["Lazy Cat"].quantity}
            onAdd={() => updateQuantity("Lazy Cat", 1)}
            onRemove={() => updateQuantity("Lazy Cat", -1)}
          />
          <MenuItem
            name="Chesse Bomb"
            price={290}
            quantity={cart["Chesse Bomb"].quantity}
            onAdd={() => updateQuantity("Chesse Bomb", 1)}
            onRemove={() => updateQuantity("Chesse Bomb", -1)}
          />
          <MenuItem
            name="Hebba Cake"
            price={350}
            quantity={cart["Hebba Cake"].quantity}
            onAdd={() => updateQuantity("Hebba Cake", 1)}
            onRemove={() => updateQuantity("Hebba Cake", -1)}
          />
          <MenuItem
            name="AI Mazia"
            price={250}
            quantity={cart["AI Mazia"].quantity}
            onAdd={() => updateQuantity("AI Mazia", 1)}
            onRemove={() => updateQuantity("AI Mazia", -1)}
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
          />
          <MenuItem
            name="Pistachio"
            price={150}
            quantity={cart["Pistachio Shake"].quantity}
            onAdd={() => updateQuantity("Pistachio Shake", 1)}
            onRemove={() => updateQuantity("Pistachio Shake", -1)}
          />
          <MenuItem
            name="Lotus"
            price={150}
            quantity={cart["Lotus Shake"].quantity}
            onAdd={() => updateQuantity("Lotus Shake", 1)}
            onRemove={() => updateQuantity("Lotus Shake", -1)}
          />
          <MenuItem
            name="Hot Chocolate (250ml)"
            price={129}
            quantity={cart["Hot Chocolate"].quantity}
            onAdd={() => updateQuantity("Hot Chocolate", 1)}
            onRemove={() => updateQuantity("Hot Chocolate", -1)}
          />
        </CategorySection>
      </div>

      <CartFooter
        total={calculateTotal()}
        onPlaceOrder={placeOrder}
        itemCount={getItemCount()}
      />
    </div>
  );
};

export default Index;
