
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { ArrowRightCircle, Heart, ShieldCheck, Users } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Menubar */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-care-blue" />
            <h1 className="text-2xl font-bold text-care-blue">CareConnect</h1>
          </div>
          
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger className="font-medium">Sobre</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Recursos</MenubarItem>
                <MenubarItem>Depoimentos</MenubarItem>
                <MenubarItem>Preços</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="font-medium">Recursos</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Documentação</MenubarItem>
                <MenubarItem>Blog</MenubarItem>
                <MenubarItem>Suporte</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="font-medium">Contato</MenubarTrigger>
            </MenubarMenu>
            <Button 
              onClick={() => navigate("/login")}
              className="ml-4 bg-care-blue hover:bg-care-blue/90"
            >
              Acessar Sistema <ArrowRightCircle className="ml-2 h-4 w-4" />
            </Button>
          </Menubar>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Gestão de Saúde Domiciliar <span className="text-care-blue">Simplificada</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              CareConnect oferece uma plataforma completa para gerenciar serviços de saúde domiciliar,
              pacientes, cuidadores e visitas - tudo em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/login")}
                className="bg-care-blue hover:bg-care-blue/90"
              >
                Começar
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/register")}
              >
                Criar Conta
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="/placeholder.svg" 
              alt="Profissionais de saúde" 
              className="rounded-xl shadow-lg max-w-full h-auto" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Principais Recursos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-care-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gestão de Pacientes</h3>
              <p className="text-gray-600">
                Gerencie facilmente informações de pacientes, registros médicos e planos de cuidados em um único painel.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-care-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Coordenação de Cuidadores</h3>
              <p className="text-gray-600">
                Agende e acompanhe visitas de cuidadores, garantindo a prestação adequada de cuidados e responsabilidade.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-care-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Relatórios Completos</h3>
              <p className="text-gray-600">
                Gere relatórios detalhados sobre cuidados com pacientes, desempenho de cuidadores e métricas de negócios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-care-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar sua gestão de saúde domiciliar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais de saúde que otimizaram suas operações com o CareConnect.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white text-care-blue hover:bg-gray-100"
            onClick={() => navigate("/register")}
          >
            Inicie seu Período Gratuito
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="h-5 w-5 text-care-blue" />
              <span className="font-bold text-care-blue">CareConnect</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 CareConnect. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
