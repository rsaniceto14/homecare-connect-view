
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API login - replace with actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting you to the dashboard.",
      });
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-care-blue-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="care-card bg-white animate-fade-in">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">CareConnect</h1>
            <p className="text-muted-foreground mt-2">Sign in to your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        type="email" 
                        {...field} 
                        autoComplete="email"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-care-blue hover:underline focus:outline-none"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        {...field}
                        autoComplete="current-password"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p className="mt-2">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={() => navigate("/register")}
                className="text-care-blue hover:underline focus:outline-none" 
              >
                Contact us
              </button>
            </p>
          </div>
          
          {isMobile && (
            <div className="mt-8 border-t pt-4">
              <p className="text-xs text-center text-muted-foreground">
                Optimized for mobile devices
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
