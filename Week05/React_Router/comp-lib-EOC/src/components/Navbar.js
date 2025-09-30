import Panel from "./Panel";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Panel>
      <Link to="/">Button</Link>
      <Link to="/accordion">Accordion</Link>
      <Link to="/dropdown">Dropdown</Link>
    </Panel>
  )
}

export default Navbar
