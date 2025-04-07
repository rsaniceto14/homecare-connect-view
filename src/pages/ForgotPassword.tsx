
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call for password reset
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description: `We've sent a password reset link to ${data.email}`,
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-care-blue-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="care-card bg-white animate-fade-in">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-care-blue mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </button>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-muted-foreground mt-2">
              {isSubmitted
                ? "Check your email for a reset link"
                : "Enter your email to receive a password reset link"}
            </p>
          </div>

          {!isSubmitted ? (
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

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center p-4">
              <p className="mb-4 text-sm text-muted-foreground">
                We've sent an email with instructions to reset your password. 
                Please check your inbox.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setIsSubmitted(false);
                }}
                className="mt-2"
              >
                Try another email
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
