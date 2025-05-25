import { useEffect, useState } from 'react';
import { Search, Moon, Pen, Trash2, Plus, Check } from 'lucide-react';
import Selector from './components/selector/selector';
import Modal from './components/modal/Modal';
import EmptyImg from './assets/Detective-check-footprint 1.png';
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todo');
    return saved ? JSON.parse(saved) : [];
  });
  const [active, setActive] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null); 
  const [editedText, setEditedText] = useState('');   
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'Complete') return task.done;
      if (filter === 'Incomplete') return !task.done;
      return true;
    })
    .filter(task =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const startEdit = (task) => {
    setEditTaskId(task.id)
    setEditedText(task.text)
  };

  const saveEditedTask = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, text: editedText } : task
    );
    setTasks(updated);
    setEditTaskId(null); 
    setEditedText('');
  };

  const addTask = (text, deadline) => {
    const newTask = {
      id: Date.now(),
      text,
      done: false,
      deadline,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteItem = (id) => {
    const updatedTask = tasks.filter(item => item.id !== id);
    setTasks(updatedTask);
    localStorage.setItem('todo', JSON.stringify(updatedTask))
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(tasks));
  }, [tasks, active]);


  return (
    <>
      <section className='container'>
        <h1>Todo List</h1>
        <div className='inline-block'>
          <div className='inline-block-input'>
            <input type="text" placeholder='Search note...'
            onChange={(e) => setSearchTerm(e.target.value)}/>
            <Search className='search-icon'/>
          </div>
          <div className='icons-blocks'>
            <Selector value={filter} onChange={(e) => setFilter(e.target.value)}/>
            <div className='icon-block'>
              <Moon />
            </div>
          </div>
        </div>
        {
          active && <Modal setActive={setActive} addTask={addTask}/>
        }
        {
          tasks.length > 0 
            ? 
              <div>
                <ul className='task-list'>
                  {filteredTasks.map(task => (
                    <li key={task.id} className='task-item'>
                      <label>
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTask(task.id)}
                        />
                        {
                          editTaskId === task.id 
                            ? 
                              <input
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveEditedTask(task.id)}
                                autoFocus
                                className='inputEdit'
                              />
                            : (
                                <span className={task.done ? 'done' : ''}>
                                  {task.text}
                                  {task.deadline && (() => {
                                    const deadlineDate = new Date(task.deadline);
                                    const now = new Date();
                                    const isOverdue = !task.done && deadlineDate < now;
                                    const className = isOverdue ? 'deadline red' : 'deadline green';
                                    return <span className={className}>{
                                      isOverdue 
                                        ? <p>Истек: {task.deadline}</p> 
                                        :<p>до {task.deadline} </p>}
                                     </span>;
                                  })()}
                                </span>
                              )
                        }
                      </label>
                      <div className='data-icons'>
                        {
                          editTaskId === task.id
                            ? <Check onClick={() => saveEditedTask(task.id)} />
                            : <Pen onClick={() => startEdit(task)}/>
                        }
                        <Trash2 onClick={() => deleteItem(task.id)}/>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            :  
              <div className='empty'> 
                <img src={EmptyImg} alt='EMPTY' />
                <h2>Empty...</h2>
              </div>
        }
        <div className='plus-modal'>
          <Plus onClick={() => setActive(true)}/>
        </div>
      </section>
    </>
  )
}

export default App;
