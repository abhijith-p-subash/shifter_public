import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage and sessionStorage
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/login");
  };
  return (
    <div>Dashboard
 <Button color="red" onClick={handleLogout}>
          Logout
        </Button>

    </div>
  )
}

export default Dashboard