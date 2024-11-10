import {
  Button,
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
  // {
  //   title: "Contact",
  //   url: "contact",
  // },
  // {
  //   title: "Advertise",
  //   url: "advertise",
  // },
  // {
  //   title: "Privacy Policy",
  //   url: "privacy-policy",
  // },
  // {
  //   title: "Login",
  //   url: "login",
  // },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  return (
    <Navbar fluid className="conatiner mx-auto">
      <NavbarBrand onClick={() => navigate("/home")}>
        <img
          src="src/assets/truck.svg"
          className="mr-3 h-8 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white bg-gradient-to-r from-brightBlue-500 via-softYellow-500 to-brightBlue-500 inline-block text-transparent bg-clip-text">
          Shifter
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button color="primary">Get started</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {moreLinks.map((link) => (
          <NavbarLink active={pathname.includes(link.url)} key={link.url}>
            <Link to={link.url}>{link.title}</Link>
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
