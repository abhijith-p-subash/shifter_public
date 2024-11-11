import {
  Footer,
 
  FooterCopyright,
  FooterDivider,
  FooterLinkGroup,
} from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";

const FooterBar = () => {
  const navigate = useNavigate();
  return (
    <Footer container bgDark  className="rounded-none">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div>
          <span onClick={() => navigate("/home")} className="cursor-pointer self-center whitespace-nowrap text-3xl font-semibold dark:text-white bg-gradient-to-r from-brightBlue-500 via-softYellow-500 to-brightBlue-500 inline-block text-transparent bg-clip-text">
          Shifter
        </span>
          </div>
          <FooterLinkGroup className="flex flex-wrap gap-4 items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <Link to={'/home'}>Home</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/get-price'}>Get Price</Link>
            {/* <FooterLink href={""}>About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink> */}
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="https://abhijithpsubash.com/" by="abhijithpsubash" year={2024} />
      </div>
    </Footer>
  );
};

export default FooterBar;
