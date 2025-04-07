
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, FilePlus, Calendar, Activity, Pill, ClipboardCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock medical records data
const mockMedicalRecords = {
  "P001": {
    patientInfo: {
      id: "P001",
      name: "Sarah Johnson",
      age: 72,
      dob: "1953-05-15",
      gender: "Female",
      bloodType: "A+",
      allergies: ["Penicillin", "Sulfa drugs"],
      emergencyContact: "John Johnson (Son) - (555) 987-6543"
    },
    diagnoses: [
      { id: "D1", date: "2023-01-15", condition: "Type 2 Diabetes", diagnosedBy: "Dr. Robert Smith" },
      { id: "D2", date: "2023-03-10", condition: "Hypertension", diagnosedBy: "Dr. Maria Rodriguez" },
      { id: "D3", date: "2024-02-05", condition: "Osteoarthritis", diagnosedBy: "Dr. Robert Smith" }
    ],
    medications: [
      { id: "M1", name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2023-01-20", endDate: null },
      { id: "M2", name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2023-03-15", endDate: null },
      { id: "M3", name: "Acetaminophen", dosage: "500mg", frequency: "As needed", startDate: "2024-02-10", endDate: null }
    ],
    visits: [
      { id: "V1", date: "2024-03-20", type: "Regular Checkup", caregiver: "Mary Williams", notes: "Patient reports feeling well. Blood pressure within normal range." },
      { id: "V2", date: "2024-02-25", type: "Medication Review", caregiver: "Mary Williams", notes: "Adjusted pain medication dosage." },
      { id: "V3", date: "2024-01-15", type: "Physical Therapy", caregiver: "James Davis", notes: "Patient showing improvement in mobility." }
    ],
    vitals: [
      { id: "VS1", date: "2024-03-20", bloodPressure: "128/84", heartRate: 72, temperature: 98.2, respiratoryRate: 16, weight: 145 },
      { id: "VS2", date: "2024-02-25", bloodPressure: "130/86", heartRate: 75, temperature: 98.6, respiratoryRate: 18, weight: 146 },
      { id: "VS3", date: "2024-01-15", bloodPressure: "135/88", heartRate: 78, temperature: 98.4, respiratoryRate: 17, weight: 148 }
    ]
  },
  "P002": {
    patientInfo: {
      id: "P002",
      name: "Robert Williams",
      age: 68,
      dob: "1957-09-23",
      gender: "Male",
      bloodType: "O-",
      allergies: ["Aspirin"],
      emergencyContact: "Susan Williams (Wife) - (555) 456-7890"
    },
    diagnoses: [
      { id: "D1", date: "2022-11-05", condition: "Heart Disease", diagnosedBy: "Dr. James Wilson" },
      { id: "D2", date: "2023-05-12", condition: "COPD", diagnosedBy: "Dr. Elizabeth Chen" }
    ],
    medications: [
      { id: "M1", name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", startDate: "2022-11-10", endDate: null },
      { id: "M2", name: "Albuterol", dosage: "90mcg", frequency: "As needed", startDate: "2023-05-15", endDate: null }
    ],
    visits: [
      { id: "V1", date: "2024-03-10", type: "Regular Checkup", caregiver: "David Thompson", notes: "Discussed importance of maintaining exercise regimen." },
      { id: "V2", date: "2024-02-02", type: "Respiratory Assessment", caregiver: "Emily Clark", notes: "Breathing improved with new medication." }
    ],
    vitals: [
      { id: "VS1", date: "2024-03-10", bloodPressure: "132/84", heartRate: 76, temperature: 98.4, respiratoryRate: 18, weight: 172 },
      { id: "VS2", date: "2024-02-02", bloodPressure: "135/86", heartRate: 78, temperature: 98.8, respiratoryRate: 20, weight: 175 }
    ]
  },
  "P003": {
    patientInfo: {
      id: "P003",
      name: "Michael Brown",
      age: 81,
      dob: "1944-03-12",
      gender: "Male",
      bloodType: "B+",
      allergies: ["Shellfish", "Iodine"],
      emergencyContact: "Patricia Brown (Daughter) - (555) 234-5678"
    },
    diagnoses: [
      { id: "D1", date: "2020-07-20", condition: "Parkinson's Disease", diagnosedBy: "Dr. Nancy Lee" },
      { id: "D2", date: "2022-04-15", condition: "Glaucoma", diagnosedBy: "Dr. Thomas Parker" }
    ],
    medications: [
      { id: "M1", name: "Levodopa", dosage: "100mg", frequency: "Three times daily", startDate: "2020-07-25", endDate: null },
      { id: "M2", name: "Timolol", dosage: "0.5%", frequency: "Twice daily", startDate: "2022-04-20", endDate: null }
    ],
    visits: [
      { id: "V1", date: "2024-03-05", type: "Neurological Assessment", caregiver: "Sarah Miller", notes: "Tremors have increased slightly. Medication adjustment recommended." },
      { id: "V2", date: "2024-01-20", type: "Eye Examination", caregiver: "John Adams", notes: "Intraocular pressure stable." }
    ],
    vitals: [
      { id: "VS1", date: "2024-03-05", bloodPressure: "125/82", heartRate: 68, temperature: 97.9, respiratoryRate: 16, weight: 155 },
      { id: "VS2", date: "2024-01-20", bloodPressure: "128/80", heartRate: 70, temperature: 98.0, respiratoryRate: 17, weight: 158 }
    ]
  },
  "P004": {
    patientInfo: {
      id: "P004",
      name: "Emily Davis",
      age: 65,
      dob: "1960-11-30",
      gender: "Female",
      bloodType: "A-",
      allergies: ["Latex"],
      emergencyContact: "Michael Davis (Husband) - (555) 876-5432"
    },
    diagnoses: [
      { id: "D1", date: "2021-03-10", condition: "Rheumatoid Arthritis", diagnosedBy: "Dr. Susan Wright" },
      { id: "D2", date: "2023-08-05", condition: "Osteoporosis", diagnosedBy: "Dr. Susan Wright" }
    ],
    medications: [
      { id: "M1", name: "Methotrexate", dosage: "15mg", frequency: "Once weekly", startDate: "2021-03-15", endDate: null },
      { id: "M2", name: "Alendronate", dosage: "70mg", frequency: "Once weekly", startDate: "2023-08-10", endDate: null }
    ],
    visits: [
      { id: "V1", date: "2024-03-15", type: "Joint Assessment", caregiver: "Jennifer White", notes: "Joint pain reduced with current medication regimen." },
      { id: "V2", date: "2024-02-10", type: "Bone Density Test", caregiver: "Robert Johnson", notes: "Slight improvement in bone density." }
    ],
    vitals: [
      { id: "VS1", date: "2024-03-15", bloodPressure: "120/78", heartRate: 72, temperature: 98.2, respiratoryRate: 15, weight: 132 },
      { id: "VS2", date: "2024-02-10", bloodPressure: "122/80", heartRate: 74, temperature: 98.0, respiratoryRate: 16, weight: 130 }
    ]
  },
  "P005": {
    patientInfo: {
      id: "P005",
      name: "James Wilson",
      age: 79,
      dob: "1946-07-05",
      gender: "Male",
      bloodType: "AB+",
      allergies: ["Codeine", "Dairy"],
      emergencyContact: "Linda Wilson (Wife) - (555) 345-6789"
    },
    diagnoses: [
      { id: "D1", date: "2019-05-20", condition: "COPD", diagnosedBy: "Dr. Richard Taylor" },
      { id: "D2", date: "2022-12-10", condition: "Congestive Heart Failure", diagnosedBy: "Dr. Richard Taylor" }
    ],
    medications: [
      { id: "M1", name: "Fluticasone/Salmeterol", dosage: "250/50mcg", frequency: "Twice daily", startDate: "2019-05-25", endDate: null },
      { id: "M2", name: "Furosemide", dosage: "40mg", frequency: "Once daily", startDate: "2022-12-15", endDate: null }
    ],
    visits: [
      { id: "V1", date: "2024-03-25", type: "Respiratory Assessment", caregiver: "Thomas Brown", notes: "Breathing difficulties when exerting. Oxygen saturation at 94%." },
      { id: "V2", date: "2024-02-15", type: "Cardiac Evaluation", caregiver: "Jessica Martinez", notes: "Mild edema in ankles. Adjusted diuretic dosage." }
    ],
    vitals: [
      { id: "VS1", date: "2024-03-25", bloodPressure: "135/85", heartRate: 80, temperature: 98.4, respiratoryRate: 20, weight: 168 },
      { id: "VS2", date: "2024-02-15", bloodPressure: "140/88", heartRate: 82, temperature: 98.6, respiratoryRate: 22, weight: 172 }
    ]
  }
};

const PatientMedicalRecord = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find patient record or show not found
  const patientRecord = patientId ? mockMedicalRecords[patientId] : null;
  
  if (!patientRecord) {
    return (
      <MainLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/patients")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Medical Record</h1>
          </div>
          <Card>
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <h2 className="text-xl font-medium">Patient Record Not Found</h2>
                <p className="text-muted-foreground mt-2">
                  The patient record you're looking for doesn't exist or has been removed.
                </p>
                <Button className="mt-4" onClick={() => navigate("/patients")}>
                  Return to Patients
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const { patientInfo, diagnoses, medications, visits, vitals } = patientRecord;

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/patients")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{patientInfo.name}'s Medical Record</h1>
            <p className="text-muted-foreground">Patient ID: {patientInfo.id}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Age</p>
                <p>{patientInfo.age} years</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                <p>{patientInfo.dob}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gender</p>
                <p>{patientInfo.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                <p>{patientInfo.bloodType}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Allergies</p>
                <p>{patientInfo.allergies.join(", ")}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                <p>{patientInfo.emergencyContact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="diagnoses" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="diagnoses" className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4" />
              <span>Diagnoses</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              <span>Medications</span>
            </TabsTrigger>
            <TabsTrigger value="visits" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Visits</span>
            </TabsTrigger>
            <TabsTrigger value="vitals" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Vitals</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="diagnoses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Diagnoses</CardTitle>
                  <CardDescription>Medical conditions and diagnoses</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-auto flex items-center gap-2">
                  <FilePlus className="h-4 w-4" />
                  <span>Add Diagnosis</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left font-medium">Date</th>
                        <th className="h-12 px-4 text-left font-medium">Condition</th>
                        <th className="h-12 px-4 text-left font-medium">Diagnosed By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diagnoses.map((diagnosis) => (
                        <tr key={diagnosis.id} className="border-b">
                          <td className="p-4">{diagnosis.date}</td>
                          <td className="p-4 font-medium">{diagnosis.condition}</td>
                          <td className="p-4">{diagnosis.diagnosedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medications">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Medications</CardTitle>
                  <CardDescription>Current and past medication regimens</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-auto flex items-center gap-2">
                  <FilePlus className="h-4 w-4" />
                  <span>Add Medication</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left font-medium">Name</th>
                        <th className="h-12 px-4 text-left font-medium">Dosage</th>
                        <th className="h-12 px-4 text-left font-medium">Frequency</th>
                        <th className="h-12 px-4 text-left font-medium">Start Date</th>
                        <th className="h-12 px-4 text-left font-medium">End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medications.map((medication) => (
                        <tr key={medication.id} className="border-b">
                          <td className="p-4 font-medium">{medication.name}</td>
                          <td className="p-4">{medication.dosage}</td>
                          <td className="p-4">{medication.frequency}</td>
                          <td className="p-4">{medication.startDate}</td>
                          <td className="p-4">{medication.endDate || "Current"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visits">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Visits</CardTitle>
                  <CardDescription>Recent care visits and assessments</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-auto flex items-center gap-2">
                  <FilePlus className="h-4 w-4" />
                  <span>Add Visit</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left font-medium">Date</th>
                        <th className="h-12 px-4 text-left font-medium">Type</th>
                        <th className="h-12 px-4 text-left font-medium">Caregiver</th>
                        <th className="h-12 px-4 text-left font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visits.map((visit) => (
                        <tr key={visit.id} className="border-b">
                          <td className="p-4">{visit.date}</td>
                          <td className="p-4">{visit.type}</td>
                          <td className="p-4">{visit.caregiver}</td>
                          <td className="p-4">{visit.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vitals">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vital Signs</CardTitle>
                  <CardDescription>Patient vital measurements</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-auto flex items-center gap-2">
                  <FilePlus className="h-4 w-4" />
                  <span>Add Vitals</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left font-medium">Date</th>
                        <th className="h-12 px-4 text-left font-medium">Blood Pressure</th>
                        <th className="h-12 px-4 text-left font-medium">Heart Rate</th>
                        <th className="h-12 px-4 text-left font-medium">Temperature</th>
                        <th className="h-12 px-4 text-left font-medium">Respiratory Rate</th>
                        <th className="h-12 px-4 text-left font-medium">Weight (lbs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vitals.map((vital) => (
                        <tr key={vital.id} className="border-b">
                          <td className="p-4">{vital.date}</td>
                          <td className="p-4">{vital.bloodPressure}</td>
                          <td className="p-4">{vital.heartRate}</td>
                          <td className="p-4">{vital.temperature}°F</td>
                          <td className="p-4">{vital.respiratoryRate}</td>
                          <td className="p-4">{vital.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PatientMedicalRecord;
