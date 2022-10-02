import React, { useState, useEffect } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ViewTask = ({ taskObject, setIsEditing }) => {
  const [checked, setChecked] = useState(false);
  const labelId = `checkbox-list-label-${taskObject.task}`;
  const date = new Date(taskObject.date).toDateString();

  useEffect(() => {
    setChecked(taskObject.status === "Completed");
  }, [taskObject.status]);

  return (
    <ListItem
      key={taskObject._id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => setIsEditing(true)}
        >
          <EditIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() => setChecked(!checked)}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={taskObject.task} secondary={date} />
      </ListItemButton>
    </ListItem>
  );
};

export default ViewTask;
