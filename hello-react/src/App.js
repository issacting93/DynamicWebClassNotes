import RecipeCard from './components/RecipeCard';
const App = () => {
    return (
        <div className="App">
            <div className="header">
                <h1>Hello My Name is Issac </h1>    
            </div>
            <div className="content">   
                <h3>
                    This is my first react app.
                </h3>
                <button>Here's my recipe </button>
            </div> 
            <RecipeCard />
        </div>
    )
}


export default App;
 