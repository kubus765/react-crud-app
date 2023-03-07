import './App.css';
import Form from './components/Form';
import Contacts from './components/Contacts';


// This code defines a functional React component called App, 
// which renders a div element with the class name "App" and includes another component called Contacts. 
// This component is exported as the default export of the file.
function App() {
  return (
    <div className="App">
      <Form />
      <br/><br/>
     <Contacts />
    </div>
  );
}

export default App;