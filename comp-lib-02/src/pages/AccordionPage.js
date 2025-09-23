import React from 'react'
import Accordion from '../components/Accordion'
import ITEMS from '../data/items'
 
 const AccordionPage = () => {
   return (
     <div>
       <h1 className="text-3xl font-bold mb-8 text-center">Accordion Page</h1>
       <Accordion items={ITEMS} />
     </div>
   )
 }
 
 export default AccordionPage 