import { useState } from 'react';
import './Modal.css';
const Modal = ({ setActive, addTask }) => {
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      addTask(input.trim(), deadline)
      setActive(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setActive(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>New Note</h2>
        <input
          type="text"
          placeholder="Input your note"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />  
        <div className='inline-btn'>
          <button onClick={() => setActive(false)}>Cancel</button>
          <button onClick={handleAdd}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
