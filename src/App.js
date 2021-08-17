import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {

  const [tasks, setTasks] = useState([]);

  const transformedTasks = useCallback(
    taskObj => {
      const loadedTasks = [];
  
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
  
      setTasks(loadedTasks);
    },
    [],
  );

  const config = {
    url: 'https://http-react-8a679-default-rtdb.firebaseio.com/tasks.json',
  }
  const {isLoading,error,sendRequest: fetchTasks} = useHttp();

  useEffect(() => {
    fetchTasks(config,transformedTasks);
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
