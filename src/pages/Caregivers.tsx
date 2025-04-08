
import { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Search, Edit } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const mockCaregivers = [
  { id: "C001", name: "David Nurse", role: "Registered Nurse", patients: 12, schedule: "Mon-Fri", phone: "(555) 987-6543" },
  { id: "C002", name: "Maria Doctor", role: "Physician", patients: 28, schedule: "Tue, Thu", phone: "(555) 876-5432" },
  { id: "C003", name: "John Therapist", role: "Physical Therapist", patients: 15, schedule: "Mon, Wed, Fri", phone: "(555) 765-4321" },
  { id: "C004", name: "Anna Counselor", role: "Mental Health", patients: 10, schedule: "Wed, Fri", phone: "(555) 654-3210" },
  { id: "C005", name: "Tom Assistant", role: "Home Health Aide", patients: 8, schedule: "Mon-Fri", phone: "(555) 543-2109" },
];

const Caregivers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCaregivers = mockCaregivers.filter(caregiver => 
    caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caregiver.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caregiver.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Caregivers</h1>
            <p className="text-muted-foreground">Manage healthcare providers and staff</p>
          </div>
          
          {/* Using Sheet for mobile-friendly caregiver addition */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="shrink-0">
                <Plus className="mr-2 h-4 w-4" />
                Add Caregiver
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Caregiver</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground mb-4">Fill in the details to add a new caregiver.</p>
                {/* Form fields would go here in a real implementation */}
                <Button className="w-full mt-4">Save Caregiver</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Caregiver Directory</CardTitle>
            <div className="flex w-full items-center space-x-2 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search caregivers..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">Patients</TableHead>
                    <TableHead className="hidden lg:table-cell">Schedule</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCaregivers.length > 0 ? (
                    filteredCaregivers.map((caregiver) => (
                      <TableRow key={caregiver.id}>
                        <TableCell className="font-medium">{caregiver.id}</TableCell>
                        <TableCell>{caregiver.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{caregiver.role}</TableCell>
                        <TableCell className="hidden md:table-cell">{caregiver.patients}</TableCell>
                        <TableCell className="hidden lg:table-cell">{caregiver.schedule}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No caregivers found.
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

export default Caregivers;
