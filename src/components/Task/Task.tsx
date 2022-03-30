import React, { useState } from 'react';
import './Task.scss';
import { formatDistanceToNow } from 'date-fns';

import { OnDeletedFunc, OnCompletedFunc, OnEditingFunc, EditingTaskFunc } from 'types/app';

interface TaskProps {
  id: string;
  created: Date;
  description: string;
  status: string;
  onDeleted: OnDeletedFunc;
  onCompleted: OnCompletedFunc;
  onEditing: OnEditingFunc;
  editingTask: EditingTaskFunc;
}

// interface TaskState {
//   value: string;
// }

type HandleChange = (event: React.ChangeEvent) => void;
type HandleClick = (event: React.KeyboardEvent) => void;

// export default class Task extends Component<TaskProps, TaskState> {
//   state: TaskState = {
//     value: this.props.description,
//   };
//
//   handleChange: HandleChange = (event) => {
//     console.log(event);
//   };
//
//   render() {
//     const date = formatDistanceToNow(new Date(this.props.created), { includeSeconds: true });
//     const completed: boolean = this.props.status === 'completed';
//     return (
//       <>
//         <div className="view">
//           <input
//             className="toggle"
//             type="checkbox"
//             checked={completed}
//             onChange={() => this.props.onCompleted(this.props.id)}
//           ></input>
//           <label>
//             <span className="description" onClick={() => this.props.onCompleted(this.props.id)}>
//               {this.props.description}
//             </span>
//             <span className="created">created {date} ago</span>
//           </label>
//           <button className="icon icon-edit" title="edit" onClick={() => this.props.onEditing(this.props.id)}></button>
//           <button
//             className="icon icon-destroy"
//             title="destroy"
//             onClick={() => this.props.onDeleted(this.props.id)}
//           ></button>
//         </div>
//         <input type="text" className="edit" value={this.state.value} onChange={this.handleChange} autoFocus></input>
//       </>
//     );
//   }
// }

const Task: React.FC<TaskProps> = ({
  created,
  description,
  status,
  onDeleted,
  editingTask,
  onEditing,
  id,
  onCompleted,
}) => {
  const [value, setValue] = useState(description);

  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });
  const completed: boolean = status === 'completed';

  const handleChange: HandleChange = (event) => {
    const { target } = event;
    const eventValue = (target as HTMLButtonElement).value;
    setValue(eventValue);
  };

  const handleClick: HandleClick = (event) => {
    if (event.key === 'Enter') {
      editingTask(value, id);
    }
  };

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onCompleted(id)}></input>
        <label>
          <span className="description" onClick={() => onCompleted(id)}>
            {description}
          </span>
          <span className="created">created {date} ago</span>
        </label>
        <button className="icon icon-edit" title="edit" onClick={() => onEditing(id)}></button>
        <button className="icon icon-destroy" title="destroy" onClick={() => onDeleted(id)}></button>
      </div>
      <input type="text" className="edit" value={value} onChange={handleChange} onKeyUp={handleClick} autoFocus></input>
    </>
  );
};

export default Task;
