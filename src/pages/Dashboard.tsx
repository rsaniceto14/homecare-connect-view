
import { CalendarClock, ClipboardCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to CareConnect</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">+4 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Visits</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Today's scheduled visits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Preview Section */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-care-success" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Visit completed for Sarah Johnson
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Today at 10:35 AM by David Nurse
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-care-warning" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Medication update for Robert Williams
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Today at 9:15 AM by Maria Doctor
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-care-danger" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Urgent visit needed for Michael Brown
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Yesterday at 4:45 PM by Admin
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
