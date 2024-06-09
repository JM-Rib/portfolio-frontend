import React from "react"
import SiteLogo from "./SiteLogo";
import MenuToggle from "./MenuToggle";
import MenuLinks from "./MenuLinks";
import NavBarContainer from "./NavBarContainer";

export default function NavBar (props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <SiteLogo
        color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};