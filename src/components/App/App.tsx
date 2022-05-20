import React, { FC, useState } from 'react';
import './App.scss';

import { NewTaskForm } from 'components/NewTaskForm';
import { Todo } from 'types/todos';
import { Task } from 'components/Task';
import { OnAddTodoFunc, OnDeletedFunc } from 'types/app';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);

  const findMaxId = (): string => {
    const ids = todos.map((item) => +item.id);
    return ids.length > 0 ? (Math.max(...ids) + 1).toString() : '1';
  };

  const createNewTask = (description: string, min: string, sec: string): Todo => {
    return {
      id: findMaxId(),
      created: new Date().toString(),
      description,
      min,
      sec,
      display: true,
    };
  };

  const onAddTodo: OnAddTodoFunc = (description, min, sec): void => {
    const newTodo = createNewTask(description, min, sec);
    setTodos([...todos, newTodo]);
  };

  const onDeleted: OnDeletedFunc = (id) => {
    const newTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const todoNodes = todos.map((todo) => {
    return (
      <li key={todo.id}>
        <Task todo={todo} onDeleted={onDeleted} />
      </li>
    );
  });

  return (
    <section className="todoapp">
      <NewTaskForm onAddTodo={onAddTodo} />
      <section className="main">
        <ul className="todo-list">{todoNodes}</ul>
      </section>
      {/*<Footer*/}
      {/*    todos={todos}*/}
      {/*    buttons={this.state.filterButtons}*/}
      {/*    clearComplete={this.clearComplete}*/}
      {/*    onSelectedFilter={this.onSelectedFilter}*/}
      {/*    onFilterTodos={this.onFilterTodos}*/}
      {/*/>*/}
    </section>
  );
};

export default App;

// export default class App extends Component<TodosProps, AppState> {
//   state: AppState = {
//     todos: [
//       {
//         id: '1',
//         created: new Date(),
//         description: 'Completed task',
//         status: 'completed',
//         display: true,
//         timer: {
//           min: '00',
//           sec: '04',
//         },
//       },
//       {
//         id: '2',
//         created: new Date(),
//         description: 'Editing task',
//         status: 'active',
//         display: true,
//         timer: {
//           min: '02',
//           sec: '02',
//         },
//       },
//       {
//         id: '3',
//         created: new Date(),
//         description: 'Active task',
//         status: 'active',
//         display: true,
//         timer: {
//           min: '02',
//           sec: '02',
//         },
//       },
//     ],
//     filterButtons: [
//       { name: 'All', selected: true },
//       { name: 'Active', selected: false },
//       { name: 'Completed', selected: false },
//     ],
//   };
//
//   createTask = (text: string, min: string, sec: string): TodoItem => {
//     return {
//       id: this.findMaxId(),
//       created: new Date(),
//       description: text,
//       status: 'active',
//       display: true,
//       timer: {
//         min: this.timerFormat(+min),
//         sec: this.timerFormat(+sec),
//       },
//     };
//   };
//
//
//   onAdd: OnAddFunc = (name, min, sec) => {
//     const newTodos = this.state.todos;
//     newTodos.push(this.createTask(name, min, sec));
//     this.setState({
//       todos: newTodos,
//     });
//   };
//
//   onCompleted: OnCompletedFunc = (id) => {
//     const newTodos = this.state.todos.map((item) => {
//       if (item.id === id) {
//         item.status = item.status === 'active' ? (item.status = 'completed') : (item.status = 'active');
//       }
//       return item;
//     });
//     this.setState({
//       todos: newTodos,
//     });
//   };
//
//   clearComplete: ClearCompleteFunc = () => {
//     const newTodos = this.state.todos.filter((item) => (item.status === ('active' || 'editing') ? item : null));
//     this.setState({
//       todos: newTodos,
//     });
//   };
//
//
//   onEditing: OnEditingFunc = (id) => {
//     const newTodos = this.state.todos.map((item) => {
//       if (item.id === id) {
//         item.status = 'editing';
//       }
//       return item;
//     });
//     this.setState({
//       todos: newTodos,
//     });
//   };
//
//   onChangeTimer: OnChangeTimerFunc = (newMin, newSec, id) => {
//     const newArray = this.state.todos.map((item) => {
//       if (item.id === id) {
//         item.timer.min = newMin;
//         item.timer.sec = newSec;
//       }
//       return item;
//     });
//     this.setState({
//       todos: newArray,
//     });
//   };
//
//   editingTask: EditingTaskFunc = (value, id) => {
//     const newArray = this.state.todos.map((item) => {
//       if (item.id === id) {
//         item.description = value;
//         item.status = 'active';
//         item.created = new Date();
//       }
//       return item;
//     });
//
//     this.setState({
//       todos: newArray,
//     });
//   };
//
//   onSelectedFilter: OnSelectedFilterFunc = (name) => {
//     const newButtons = this.state.filterButtons.map((btn) => {
//       btn.selected = btn.name === name;
//       return btn;
//     });
//     this.setState({
//       filterButtons: newButtons,
//     });
//   };
//
//   onFilterTodos: OnFilterTodosFunc = (name) => {
//     const allTodods = this.state.todos.map((item) => {
//       if (name === 'Active') {
//         item.display = item.status === 'active';
//       } else if (name === 'Completed') {
//         item.display = item.status === 'completed';
//       } else {
//         item.display = true;
//       }
//       return item;
//     });
//     this.setState({
//       todos: allTodods,
//     });
//   };
//
//   render() {
//     return (
//       <section className="todoapp">
//         <NewTaskForm onAdd={this.onAdd} />
//         <section className="main">
//           <TaskList
//             todos={this.state.todos}
//             onEditing={this.onEditing}
//             onCompleted={this.onCompleted}
//             onDeleted={this.onDeleted}
//             editingTask={this.editingTask}
//             timerFormat={this.timerFormat}
//             onChangeTimer={this.onChangeTimer}
//           />
//         </section>
//         <Footer
//           todos={this.state.todos}
//           buttons={this.state.filterButtons}
//           clearComplete={this.clearComplete}
//           onSelectedFilter={this.onSelectedFilter}
//           onFilterTodos={this.onFilterTodos}
//         />
//       </section>
//     );
//   }
// }
