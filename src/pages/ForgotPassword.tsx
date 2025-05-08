
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, KeyRound } from "lucide-react";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido" }),
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
      // Simulate API call - replace with actual password reset request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "Link de redefinição enviado",
        description: "Verifique seu e-mail para instruções de redefinição de senha.",
      });
      
    } catch (error) {
      toast({
        title: "Falha na solicitação",
        description: "Houve um erro ao enviar o link de redefinição. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-care-blue-light to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate("/login")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o login
        </Button>
        
        <div className="care-card bg-white animate-fade-in">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-care-blue rounded-full flex items-center justify-center">
                <KeyRound className="text-white" size={24} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Redefinir Senha</h1>
            <p className="text-muted-foreground mt-2">Enviaremos um link para redefinir sua senha</p>
          </div>

          {isSubmitted ? (
            <div className="py-4">
              <Alert className="bg-green-50 border-green-200">
                <AlertTitle className="text-green-800">Verifique sua caixa de entrada</AlertTitle>
                <AlertDescription className="text-green-700">
                  Enviamos um link de redefinição de senha para <span className="font-medium">{form.getValues().email}</span>.
                  Por favor, verifique seu e-mail e siga as instruções.
                </AlertDescription>
              </Alert>
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/login")}
                  className="mr-2"
                >
                  Voltar para o login
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                  }}
                >
                  Tentar outro e-mail
                </Button>
              </div>
            </div>
          ) : (
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
                          placeholder="nome@exemplo.com" 
                          type="email" 
                          {...field} 
                          disabled={isLoading}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-11" 
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar Link de Redefinição"}
                </Button>
              </form>
            </Form>
          )}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Lembrou sua senha?{" "}
              <button 
                type="button"
                onClick={() => navigate("/login")}
                className="text-care-blue hover:underline focus:outline-none" 
              >
                Entrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
