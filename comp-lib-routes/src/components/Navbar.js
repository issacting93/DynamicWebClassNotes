import Panel from "./Panel";
import Button from "./Button";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <Panel className="flex justify-between gap-2">
      <div className="flex gap-2">
        <Button to="/" primary>
          <FaHome />
          Home
        </Button> 
      </div>
      <div className="flex gap-2">
        <Button to="/button" outline>
          Button
        </Button>
        <Button to="/accordion" outline>
          Accordion
        </Button>
      </div>
    </Panel>
  )
}

export default Navbar