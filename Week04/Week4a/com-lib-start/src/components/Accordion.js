import {useState} from 'react'
import {GoChevronDown, GoChevronLeft} from 'react-icons/go'
/*
const Props = {
  label: string,
  content: string,
  onClick: function,
}

// const state = {
//   isExpanded: false,
// }
*/

const DUMMYDATA = {
  id: 'l1kj2i0g',
  label: 'When do chickens molt?',
  content:
    'Duis eget turpis vel ligula imperdiet suscipit eu ut felis. Ut eget neque at ligula aliquam ultricies eu vitae dolor. Proin eu dignissim velit. Morbi convallis volutpat nisl at vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam non dignissim sem. Aliquam cursus, tortor at iaculis fermentum, felis tortor interdum justo, eu ornare lorem dui eu lorem. Phasellus nibh sem, tempus at fermentum vel, pulvinar at tellus. Nunc eleifend velit at massa bibendum placerat. Sed tincidunt vestibulum ante ut pellentesque. Duis eget nisl varius, dapibus nunc sed, aliquam diam',
}

const Accordion = (props) => {
  // pull out our props with destructuring
  const {items} = props
  console.log(items)
  // state
  const [isExpanded, setIsExpanded] = useState(true)

  // event handling function
  const handleClick = () => {
    setIsExpanded(!isExpanded)
    // NEVER EVER EVER IN A MILLION YEARS EVER
    // isExpanded = !isExpanded
  }

  icon = (
    <span className="text-2xl">
      {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
    </span>
  )

  // JSX returned and rendered to the user
  return <div>Coming Soon</div>
}

export default Accordion
