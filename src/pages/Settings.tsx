
import { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, User, Bell, Shield, Building } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    name: "Dr. Smith",
    email: "doctor.smith@careconnect.com",
    phone: "(555) 123-4567",
    title: "Medical Director",
    bio: "Board-certified physician with over 15 years of experience in home healthcare management.",
  });

  const [organizationForm, setOrganizationForm] = useState({
    name: "CareConnect Health Services",
    phone: "(555) 987-6543",
    address: "123 Healthcare Ave, Medical City, MC 12345",
    website: "www.careconnect-health.com",
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleOrganizationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Organization Updated",
      description: "Organization information has been updated successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
          <Card className="h-fit">
            <CardContent className="p-4">
              <nav className="flex flex-col space-y-1">
                <Button variant="ghost" className="justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Building className="mr-2 h-4 w-4" />
                  Organization
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button variant="ghost" className="justify-start">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
              </nav>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input 
                        id="title" 
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({...profileForm, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      rows={4} 
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                    />
                  </div>
                  <Button type="submit">Update Profile</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
                <CardDescription>Update your organization information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOrganizationUpdate} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input 
                        id="org-name" 
                        value={organizationForm.name}
                        onChange={(e) => setOrganizationForm({...organizationForm, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-phone">Phone Number</Label>
                      <Input 
                        id="org-phone" 
                        value={organizationForm.phone}
                        onChange={(e) => setOrganizationForm({...organizationForm, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="org-address">Address</Label>
                      <Input 
                        id="org-address" 
                        value={organizationForm.address}
                        onChange={(e) => setOrganizationForm({...organizationForm, address: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="org-website">Website</Label>
                      <Input 
                        id="org-website" 
                        value={organizationForm.website}
                        onChange={(e) => setOrganizationForm({...organizationForm, website: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button type="submit">Update Organization</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
