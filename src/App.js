import './App.css';
import Contacts from './Contacts';

// This code defines a functional React component called App, 
// which renders a div element with the class name "App" and includes another component called Contacts. 
// This component is exported as the default export of the file.
function App() {
  return (
    <div className="App">
     <Contacts />
    </div>
  );
}

export default App;