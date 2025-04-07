
import { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Calendar as CalendarIcon, Clock, Plus, Search } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const mockVisits = [
  { id: "V001", patient: "Sarah Johnson", caregiver: "David Nurse", date: "2025-04-07", time: "09:00 AM", status: "Completed", type: "Routine Check" },
  { id: "V002", patient: "Robert Williams", caregiver: "Maria Doctor", date: "2025-04-07", time: "11:30 AM", status: "Scheduled", type: "Medication Review" },
  { id: "V003", patient: "Michael Brown", caregiver: "John Therapist", date: "2025-04-08", time: "10:15 AM", status: "Scheduled", type: "Physical Therapy" },
  { id: "V004", patient: "Emily Davis", caregiver: "Anna Counselor", date: "2025-04-08", time: "02:00 PM", status: "Scheduled", type: "Mental Health" },
  { id: "V005", patient: "James Wilson", caregiver: "Tom Assistant", date: "2025-04-09", time: "08:30 AM", status: "Scheduled", type: "Daily Assistance" },
];

const Visits = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredVisits = mockVisits.filter(visit => 
    visit.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.caregiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Visits</h1>
            <p className="text-muted-foreground">Schedule and manage patient visits</p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Visit
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4">
                <h3 className="font-medium mb-2">Selected Date</h3>
                <p className="text-sm text-muted-foreground">{date ? format(date, 'PPP') : 'None'}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Summary</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Total Visits</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Completed</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Scheduled</span>
                      <span className="font-medium">4</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Visit Schedule</CardTitle>
              <div className="flex w-full items-center space-x-2 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search visits..."
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
                      <TableHead>Patient</TableHead>
                      <TableHead>Caregiver</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Time</TableHead>
                      <TableHead className="hidden lg:table-cell">Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVisits.length > 0 ? (
                      filteredVisits.map((visit) => (
                        <TableRow key={visit.id}>
                          <TableCell className="font-medium">{visit.id}</TableCell>
                          <TableCell>{visit.patient}</TableCell>
                          <TableCell>{visit.caregiver}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              {visit.date}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              {visit.time}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{visit.type}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              visit.status === "Completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {visit.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No visits found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Visits;
