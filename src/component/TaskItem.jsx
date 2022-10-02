import React, { useState } from "react";
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";

const TaskItem = ({ taskObject }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EditTask taskObject={taskObject} isEditing={isEditing} setIsEditing={setIsEditing} />
      ) : (
        <ViewTask
          taskObject={taskObject}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default TaskItem;
