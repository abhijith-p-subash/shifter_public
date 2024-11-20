import {
  // Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const moreLinks = [
  {
    title: "Home",
    url: "home",
  },
  {
    title: "About",
    url: "about",
  },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  

  return (
    <div className="min-w-full flex justify-center items-center ">
      <Navbar
      fluid
      className="container mx-auto bg-white text-white"
      rounded={true}
    >
      <NavbarBrand onClick={() => navigate("/home")}>
       <div className="flex items-center justify-center bg-brightBlue-800 px-2 rounded-full">
         <img
          src="src/assets/truck.svg"
          className="mr-1 h-8 sm:h-9"
          alt="Shifter Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white bg-gradient-to-r from-brightBlue-500 via-softYellow-500 to-brightBlue-500 inline-block text-transparent bg-clip-text">
          Shifter
        </span>
       </div>
      </NavbarBrand>

      <div className="flex md:order-2">
        {/* <Button onClick={() => navigate("/get-price")} color="primary" className="mx-6 bg-brightBlue-500 hover:bg-brightBlue-600">
        Get Price
        </Button> */}
        <button
              className="mx-4 px-6 py-3 bg-gradient-to-r from-softYellow-500 to-brightBlue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/get-price")}
            >
              Get Price
            </button>
       
        <NavbarToggle />
      </div>

      <NavbarCollapse className="md:ml-auto">
        {moreLinks.map((link) => (
          <NavbarLink
            active={pathname.includes(link.url)}
            key={link.url}
            className="text-darkBlue-500 hover:text-brightBlue-500"
          >
            <Link to={link.url}>{link.title}</Link>
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
    </div>
  );
};

export default Header;
