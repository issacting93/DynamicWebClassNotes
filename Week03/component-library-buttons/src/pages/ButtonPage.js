import React from 'react'
import Button from '../components/Button'

const ButtonPage = () => {
  return (
    <div>
      <h1>Button Page</h1>
      <div>
        <Button primary>Primary</Button>
      </div>

      <div>
        <Button secondary>Secondary</Button>
      </div>

      <div>
        <Button success>Success</Button>
      </div>

      <div>
        <Button warning>Warning</Button>
      </div>

      <div>
        <Button danger>Danger</Button>
      </div>
    </div>
  )
}

export default ButtonPage
