import React, { useState } from 'react';

function ToggleSwitch({ labelLeft , labelRight, onToggle }) {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    if (onToggle) {
      onToggle(!isOn);
    }
  };

  return (
    <div className={`toggleswitch ${isOn ? 'on' : 'off'}`} onClick={handleToggle}>
      <div className="toggletrack"></div>
      <div className="togglecontainer">
        <div className="label leftlabel">{labelLeft}</div>
        <div className="label rightlabel">{labelRight}</div>
      </div>
    </div>
  );
}

export default ToggleSwitch;