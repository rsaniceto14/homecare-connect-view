
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to landing page
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Welcome to CareConnect</h1>
        <p className="text-muted-foreground">Home Care Management Platform</p>
        <p className="mt-4">Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
