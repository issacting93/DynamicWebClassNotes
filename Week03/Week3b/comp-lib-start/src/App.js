import Button from './components/Button'

const App = () => {
  return (
    <>
      <div>
        <Button
          primary
          danger
        >
          Buy Now
        </Button>
      </div>
      <div>
        <Button
          secondary
          rounded
        >
          Secondary Button
        </Button>
      </div>
      <div>
        <Button danger>Delete</Button>
      </div>
      <div>
        <Button
          warning
          outline
          rounded
        >
          Are you sure?
        </Button>
      </div>
      <div>
        <Button
          success
          outline
        >
          Success
        </Button>
      </div>
    </>
  )
}

export default App
