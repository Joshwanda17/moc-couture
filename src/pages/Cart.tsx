import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navbar cartItemCount={0} />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-display font-bold mb-4">Your Cart</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your cart is empty
            </p>
            <Link to="/gallery">
              <Button size="lg" className="bg-gradient-warm hover:opacity-90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar cartItemCount={items.length} />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 flex items-center justify-between animate-fade-in">
          <h1 className="text-5xl font-display font-bold">Your Cart</h1>
          <Button
            variant="outline"
            onClick={clearCart}
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Clear Cart
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item, index) => (
            <Card 
              key={item.id} 
              className="p-6 animate-fade-in bg-card border-border/50"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex gap-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold mb-1">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-card border-border/50 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold">Calculated at checkout</span>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span className="font-display">Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-gradient-warm hover:opacity-90 text-lg"
            >
              Proceed to Checkout
            </Button>
            <Link to="/gallery">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-2"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Cart;
