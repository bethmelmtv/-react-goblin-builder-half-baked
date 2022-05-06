import './App.css';
import GoblinForm from './GoblinForm';
import GoblinList from './GoblinList';
import Goblin from './Goblin';
import { useState } from 'react';

function App() {
  /* 
    track: 
      allGoblins, an array of all goblins
      filteredGoblins, a second array of goblins: this one is the filtered version of the above allGoblins array
      goblinFormName, which is how we track the user input for the current name of the goblin in the form
      goblinFormHP, which is how we track the user input for the current HP of the goblin in the form
      goblinFormColor, which is how we track the user input for the current color of the goblin in the form
*/

  const [allGoblins, setAllGoblins] = useState([{ name:'goblin-one', hp: 3, color: 'red' }]); // what each object in array will look like
  const [filteredGoblins, setFilteredGoblins] = useState([]); 
  const [goblinFormName, setGoblinFormName] = useState('goblin-name');
  const [goblinFormHP, setGoblinFormHP] = useState(3);
  const [goblinFormColor, setGoblinFormColor] = useState('red');


  function submitGoblin(e) {
    e.preventDefault();
    
    const newGoblin = { 
      name: goblinFormName,
      hp: goblinFormHP,
      color: goblinFormColor,
    };
    // on submit, make a new goblin object with a name that comes from the form state, an hp that comes from the form state, and a color that comes from the form state

    // update the allGoblins array. Add the new goblin to the allGoblins array immutably.
    setAllGoblins([...allGoblins, newGoblin]);
 
    // clear out the goblin form state items by setting them to empty strings. This will cause the form to reset in the UI.
    setGoblinFormName('');
    setGoblinFormHP('');
    setGoblinFormColor('');
  }

  function handleDeleteGoblin(name) {
    // find the index of the goblin in allGoblins with this name
    const deleteGoblin = allGoblins.findIndex((goblin) => goblin.name === name);
    // use splice to delete the goblin object at this index
    allGoblins.splice(deleteGoblin, 1);
    // update the allGoblins array immutably to this new, smaller array
    setAllGoblins([...allGoblins]);
  }

  function handleFilterGoblins(search) {
    if (search) {
          // use the filter method to get an array of goblins whose name includes this search argument
      const filteredGoblins = allGoblins.filter(goblin => goblin.name.toLowerCase().includes(search.toLowerCase()));
            // if there is a search argument, set the filtered goblins to the filtered goblins
      setFilteredGoblins([...filteredGoblins]);
    }
    // if the search argument is undefined, set the filtered goblins in state to just be the array of all goblins
    else {
      setFilteredGoblins([...allGoblins]);
    }
  }
// adding for gitpushhh

  return (
    <div className="App">
      <div className='current-goblin quarter'>
        <Goblin goblin={{
          name: goblinFormName,
          hp: goblinFormHP,
          color: goblinFormColor,
          /* 
            use the goblin form state to make a goblin object and to display it. 
            This will let the user see the current form state 
          */
         //this code is to render the goblin 
        }}/>

      </div>

      <div className='goblin-filter quarter'>
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input onChange={(e) => handleFilterGoblins(e.target.value)} />
      </div>


      <GoblinForm 
        /*
        This component takes in a ton of props! 
        Here is the list of props to pass:
          submitGoblin,
          goblinFormName, 
          setGoblinFormName,
          goblinFormColor, 
          setGoblinFormColor,
          goblinFormHP, 
          setGoblinFormHP,
        */
        submitGoblin={submitGoblin} 
        goblinFormName= {goblinFormName} 
        setGoblinFormName= {setGoblinFormName} 
        goblinFormColor={goblinFormColor}
        setGoblinFormColor= {setGoblinFormColor}
        goblinFormHP={goblinFormHP} 
        setGoblinFormHP={setGoblinFormHP}
      />

      <GoblinList 
        goblins={
          filteredGoblins.length ? filteredGoblins : allGoblins}
         // this takes in an array of goblins. If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array 
        handleDeleteGoblin={handleDeleteGoblin} // note that the goblin list has access to the ability to delete
      />
    </div>
  );
}

export default App;
