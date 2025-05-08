
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";

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
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { login } = useAuth();

  // Get the page they were trying to visit from location state
  const from = location.state?.from?.pathname || "/dashboard";

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
      const success = await login(data.email, data.password);
      
      if (success) {
        toast({
          title: "Bem-vindo de volta!",
          description: "Login bem-sucedido. Redirecionando para o painel.",
        });
        
        // Redirect to dashboard or the page they were trying to visit
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        toast({
          title: "Falha no login",
          description: "Por favor, verifique suas credenciais e tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Falha no login",
        description: "Por favor, verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setIsLoading(true);
    form.setValue("email", "test@careconnect.com");
    form.setValue("password", "password123");
    
    try {
      const success = await login("test@careconnect.com", "password123");
      
      if (success) {
        toast({
          title: "Bem-vindo ao CareConnect!",
          description: "Login de teste bem-sucedido. Redirecionando para o painel.",
        });
        
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        toast({
          title: "Falha no login de teste",
          description: "Por favor, tente novamente ou use o login manual.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Falha no login de teste",
        description: "Por favor, tente novamente ou use o login manual.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-care-blue-light to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="care-card bg-white animate-fade-in p-6 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-care-blue rounded-full flex items-center justify-center">
                <LogIn className="text-white" size={24} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">CareConnect</h1>
            <p className="text-muted-foreground mt-2">Entre na sua conta</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        autoComplete="email"
                        disabled={isLoading}
                        className="h-11"
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
                      <FormLabel>Senha</FormLabel>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-care-blue hover:underline focus:outline-none"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="••••••••" 
                          type={showPassword ? "text" : "password"} 
                          {...field}
                          autoComplete="current-password"
                          disabled={isLoading}
                          className="h-11 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-3">
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-medium" 
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full h-11 text-base font-medium border-dashed" 
                  disabled={isLoading}
                  onClick={handleTestLogin}
                >
                  Login de Teste (Um Clique)
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="mt-2">
              Não tem uma conta?{" "}
              <button 
                type="button"
                onClick={() => navigate("/register")}
                className="text-care-blue hover:underline focus:outline-none" 
              >
                Solicitar acesso
              </button>
            </p>
          </div>
          
          {isMobile && (
            <div className="mt-8 border-t pt-4">
              <p className="text-xs text-center text-muted-foreground">
                Saúde ao seu alcance
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
