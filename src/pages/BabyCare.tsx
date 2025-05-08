
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, Milk, Moon } from "lucide-react";

export default function BabyCare() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cuidados com o Bebê</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe e gerencie atividades de cuidados com o bebê
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alimentação</CardTitle>
              <Milk className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold">Última alimentação</div>
                  <div className="text-xs text-muted-foreground">
                    2 horas atrás
                  </div>
                </div>
                <Button className="w-full" size="sm">
                  Registrar Alimentação
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Troca de Fralda</CardTitle>
              <Baby className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold">Última troca</div>
                  <div className="text-xs text-muted-foreground">
                    1 hora atrás
                  </div>
                </div>
                <Button className="w-full" size="sm">
                  Registrar Troca
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sono</CardTitle>
              <Moon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold">Último sono</div>
                  <div className="text-xs text-muted-foreground">
                    3 horas atrás
                  </div>
                </div>
                <Button className="w-full" size="sm">
                  Registrar Sono
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
