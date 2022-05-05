import React from 'react';
import Goblin from './Goblin';

export default function GoblinList(props) {
  return (
    <div className='goblin-list quarter'>
      {
        props.goblins.map((goblin) => <Goblin key={goblin} goblin={goblin} handleDeleteGoblin= {props.handleDeleteGoblin} />)
         /* map over your goblins and render out a Goblin component for each goblin. You've seen this before. The only difference here is that you need to pass handleDeleteGoblin (a prop that is a function), as well */
      }
    </div>
  );
}
