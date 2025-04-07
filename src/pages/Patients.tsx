
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
  { id: "P002", name: "Robert Williams", age: 68, condition: "Heart Disease", address: "456 Oak Ave", phone: "(555) 234-5678" },
  { id: "P003", name: "Michael Brown", age: 81, condition: "Parkinson's", address: "789 Pine Rd", phone: "(555) 345-6789" },
  { id: "P004", name: "Emily Davis", age: 65, condition: "Arthritis", address: "101 Elm St", phone: "(555) 456-7890" },
  { id: "P005", name: "James Wilson", age: 79, condition: "COPD", address: "202 Maple Dr", phone: "(555) 567-8901" },
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
            <h1 className="text-2xl font-bold">Patients</h1>
            <p className="text-muted-foreground">Manage patient information and care plans</p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Patient Directory</CardTitle>
            <div className="flex w-full items-center space-x-2 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search patients..."
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
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead className="hidden md:table-cell">Condition</TableHead>
                    <TableHead className="hidden lg:table-cell">Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                              title="View Medical Record"
                            >
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View Medical Record</span>
                            </Button>
                            <Button variant="ghost" size="icon" title="Edit Patient">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No patients found.
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
