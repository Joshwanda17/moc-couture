import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://192.168.100.8:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      login(data.user, data.token);

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch("http://192.168.100.8:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Google Login failed");
      }

      login(data.user, data.token);

      toast({
        title: "Welcome!",
        description: "Successfully logged in with Google.",
      });

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google Login failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Column: Image & Brand Story */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-end overflow-hidden">
        <img
          src="/images/crochet-business/490f108b6ffcb2bfe511fdb9228c5750.jpg"
          alt="MoC Couture Fashion"
          className="absolute inset-0 object-cover w-full h-full object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="relative z-10 p-12 text-white">
          <Link to="/" className="inline-block mb-12">
            <h1 className="font-display text-3xl tracking-widest uppercase hover:opacity-80 transition-opacity">
              MoC Couture
            </h1>
          </Link>
          <h2 className="font-display text-5xl mb-4 leading-tight">
            Wear The Art.
            <br />
            Embrace The Heritage.
          </h2>
          <p className="font-body text-white/80 max-w-md text-lg">
            Sign in to discover curated collections and exclusive artisan pieces tailored just for you.
          </p>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h3 className="font-display text-4xl mb-2">Welcome Back</h3>
            <p className="text-muted-foreground font-body">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="uppercase tracking-wider text-xs font-bold text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-none border-t-0 border-x-0 border-b-2 border-outline-variant focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="uppercase tracking-wider text-xs font-bold text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-none border-t-0 border-x-0 border-b-2 border-outline-variant focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent h-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 font-body uppercase tracking-widest text-sm"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                toast({ variant: "destructive", title: "Error", description: "Google Login failed" });
              }}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground font-body mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline underline-offset-4 font-medium">
              Create an account
            </Link>
          </p>

          <div className="text-center mt-4 lg:hidden">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
