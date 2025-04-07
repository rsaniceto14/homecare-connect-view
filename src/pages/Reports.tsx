
import { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ClipboardList, Download, Search } from "lucide-react";

const mockReports = [
  { id: "R001", title: "Monthly Patient Summary", date: "2025-04-01", author: "Maria Doctor", type: "Summary", status: "Published" },
  { id: "R002", title: "Q1 Medication Usage", date: "2025-03-31", author: "David Nurse", type: "Analysis", status: "Draft" },
  { id: "R003", title: "Patient Progress Report - Williams", date: "2025-03-28", author: "John Therapist", type: "Clinical", status: "Published" },
  { id: "R004", title: "Staff Performance Review", date: "2025-03-15", author: "Admin", type: "Administrative", status: "Published" },
  { id: "R005", title: "Equipment Inventory Report", date: "2025-03-10", author: "Tom Assistant", type: "Inventory", status: "Draft" },
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredReports = mockReports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Generate and manage clinical reports</p>
          </div>
          <Button className="shrink-0">
            <ClipboardList className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Report Library</CardTitle>
              <div className="flex w-full items-center space-x-2 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search reports..."
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
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Author</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.title}</TableCell>
                          <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                          <TableCell className="hidden lg:table-cell">{report.author}</TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.status === "Published" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {report.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No reports found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Clinical Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  Administrative
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                  Medication Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                  Patient Summaries
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  Inventory Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
