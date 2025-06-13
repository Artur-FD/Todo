import { useState, useEffect, useRef } from 'react';
import Form from '../form/Form';
import Item from '../item/Item';
import style from './index.module.scss';

export default function App() {
  const [todos, setTodos] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      isMounted.current = true;
    }
  }, [todos]);

  const createTask = (value) => {
    if (value) {
      const newTask = {
        value,
        id: Date.now(),
        isChecked: false,
      };
      setTodos([...todos, newTask]);
    }
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const updateTask = (id, newValue, isChecked = null) => {
  setTodos(todos.map((item) =>
    item.id === id
      ? { ...item, value: newValue, isChecked: isChecked !== null ? isChecked : item.isChecked }
      : item
  ));
};

  return (
    <div className={style.app}>
      <h1 className={style.header}>Todo</h1>
      <Form createTask={createTask} />
      <ul className={style.list}>
        {todos.map((item) => (
          <Item 
            key={item.id} 
            item={item} 
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </div>
  );
}
