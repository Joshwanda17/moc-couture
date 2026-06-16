import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const { items } = useCart();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We will get back to you shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={items.length} />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Whether you have a question about our collections, need help with an order, or want to discuss a custom piece, we'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 animate-fade-in" style={{ animationDelay: '100ms' }}>
          
          {/* Contact Form */}
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-semibold">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required className="bg-muted/50 border-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="bg-muted/50 border-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required className="bg-muted/50 border-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" required className="min-h-[150px] bg-muted/50 border-none" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-gradient-warm hover:opacity-90">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-12 flex flex-col justify-center">
            <div className="flex items-start space-x-4">
              <div className="bg-muted p-3 rounded-full text-primary mt-1">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground mb-1">For general inquiries and customer support:</p>
                <a href="mailto:hello@moccouture.com" className="text-primary hover:underline font-medium">hello@moccouture.com</a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-muted p-3 rounded-full text-primary mt-1">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground mb-1">Available Mon-Fri, 9am - 5pm EAT:</p>
                <p className="text-foreground font-medium">+256 123 456 789</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-muted p-3 rounded-full text-primary mt-1">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Studio</h3>
                <p className="text-muted-foreground mb-1">Visits by appointment only.</p>
                <p className="text-foreground font-medium">Kampala, Uganda</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
