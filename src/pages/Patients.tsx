
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Search, Edit, User, FileText } from "lucide-react";

const mockPatients = [
  { id: "P001", name: "Sarah Johnson", age: 72, condition: "Diabetes", address: "123 Main St", phone: "(555) 123-4567" },
  { id: "P002", name: "Robert Williams", age: 68, condition: "Doença Cardíaca", address: "456 Oak Ave", phone: "(555) 234-5678" },
  { id: "P003", name: "Michael Brown", age: 81, condition: "Parkinson", address: "789 Pine Rd", phone: "(555) 345-6789" },
  { id: "P004", name: "Emily Davis", age: 65, condition: "Artrite", address: "101 Elm St", phone: "(555) 456-7890" },
  { id: "P005", name: "James Wilson", age: 79, condition: "DPOC", address: "202 Maple Dr", phone: "(555) 567-8901" },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredPatients = mockPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Pacientes</h1>
            <p className="text-muted-foreground">Gerencie informações de pacientes e planos de cuidados</p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Paciente
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Diretório de Pacientes</CardTitle>
            <div className="flex w-full items-center space-x-2 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar pacientes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Idade</TableHead>
                    <TableHead className="hidden md:table-cell">Condição</TableHead>
                    <TableHead className="hidden lg:table-cell">Telefone</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell className="hidden md:table-cell">{patient.condition}</TableCell>
                        <TableCell className="hidden lg:table-cell">{patient.phone}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => navigate(`/patients/${patient.id}/medical-record`)}
                              title="Ver Prontuário Médico"
                            >
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Ver Prontuário Médico</span>
                            </Button>
                            <Button variant="ghost" size="icon" title="Editar Paciente">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum paciente encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Patients;
