import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
  Stack,
  Fade,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useTaskContext } from "../context/TaskContext";

const Task = ({ id, title, description, completed, createdAt }) => {
  const { fetchTasks } = useTaskContext();

  const updateStatus = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`, {
        completed: !completed,
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const removeTask = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <Fade in>
      <Paper
        variant="outlined"
        sx={{
          mb: 1.5,
          p: 1.8,
          borderRadius: 3,
          bgcolor: completed ? "success.light" : "grey.50",
          display: "flex",
          alignItems: "center",
          transition: "0.3s",
          "&:hover": { boxShadow: 4 },
        }}
      >
        <IconButton
          edge="start"
          color={completed ? "primary" : "default"}
          onClick={updateStatus}
          sx={{ mr: 1 }}
        >
          {completed ? (
            <CheckCircleOutlineIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </IconButton>

        <ListItem
          disablePadding
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={removeTask}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ textDecoration: completed ? "line-through" : "none" }}
              >
                {title}
              </Typography>
            }
            secondary={
              <Stack spacing={0.5}>
                {description && (
                  <Typography variant="body2">{description}</Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  {new Date(createdAt).toLocaleString()}
                </Typography>
              </Stack>
            }
          />
        </ListItem>
      </Paper>
    </Fade>
  );
};
export default Task;
