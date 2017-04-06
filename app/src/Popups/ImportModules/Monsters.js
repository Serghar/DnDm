import React from 'react'

const Monsters = ({modList, updateModuleSelection}) => {
    console.log(modList);
    const moduleItems = modList.map((mod, idx) => {
      return (
          <ModuleItem index={idx} {...mod} updateModuleSelection={updateModuleSelection}/>
        )
    });
    return (
    <div>
      <h1>Import Monster Modules</h1>
      <h3>The following modules are avaliable...</h3>
      <ul>
        {moduleItems}
      </ul>
    </div>
    )
}

const ModuleItem = ({index, name, checked, updateModuleSelection}) => {
  return (
    <li>
      <input type="checkbox" checked={checked} onChange={(event) => {updateModuleSelection(event, index);}}/>{name}
    </li>
  )
}
    
export default Monsters