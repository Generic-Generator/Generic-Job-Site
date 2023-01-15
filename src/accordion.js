import React, {useState} from 'react';

const Accordion = ({title, content, ind}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
      <div className="accordion-item">
        <div className={`accordion-title ${(ind % 2 === 0) ? "even" : ""}`} onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div className="accordion-content">{content}</div>}
      </div>
    </React.Fragment>
  );
};

export default Accordion;