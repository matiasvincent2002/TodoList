import React, { useState } from 'react';
import style from './TodoList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [favoriteTasks, setFavoriteTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (newTask.trim() === '') {
      setErrorMessage('Debes ingresar una tarea');
      return;
    }

    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
    setErrorMessage('');
  };

  const toggleFavorite = (index) => {
    const taskToToggle = tasks[index];
    if (favoriteTasks.includes(taskToToggle)) {
      const updatedFavoriteTasks = favoriteTasks.filter((task) => task !== taskToToggle);
      setFavoriteTasks(updatedFavoriteTasks);
    } else {
      setFavoriteTasks([...favoriteTasks, taskToToggle]);
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const taskToRemove = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    if (favoriteTasks.includes(taskToRemove)) {
      const updatedFavoriteTasks = favoriteTasks.filter((task) => task !== taskToRemove);
      setFavoriteTasks(updatedFavoriteTasks);
    }
  };

  return (
    <div className={style['todo-list']}>
      <h2 className={style.header}>Todo List</h2>
      <div className={style['input-container']}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={style.button} onClick={addTask}>
          Add
        </button>
      </div>
      {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
      < ul className={style['task-list']}>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`${style['task-item']} ${task.completed ? style.completed : ''}`}
          >
            
            <span className={style.taskText}>{task.text}</span>
            <div className={style['task-content']}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`${style.icon} ${favoriteTasks.includes(task) ? style.favorite : ''}`}
              onClick={() => toggleFavorite(index)}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={`${style.icon} ${task.completed ? style.completed : ''}`}
              onClick={() => toggleComplete(index)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className={style.icon}
              onClick={() => removeTask(index)}
            />
            </div>
          </li>
        ))}
      </ul>
      {favoriteTasks.length > 0 && (
        <div className={style['favorite-tasks']}>
          <h3 className={style['favorite-header']}>Favorite Tasks</h3>
          <ul className={style['favorite-list']}>
            {favoriteTasks.map((task, index) => (
              <li key={index} className={style['favorite-item']}>
                <span className={style.taskText}>{task.text}</span>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`${style.icon} ${style.favorite}`}
                  onClick={() => toggleFavorite(tasks.indexOf(task))}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoList;
