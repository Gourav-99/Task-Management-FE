import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
  Stack,
  Fade,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useTaskContext } from "../context/TaskContext";
import { useSnackbar } from "../context/SnackbarProvider";

const Task = ({ id, title, description, completed, createdAt }) => {
  const { fetchTasks } = useTaskContext();
  const { showMessage } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const updateStatus = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`, {
        completed: !completed,
      });
      fetchTasks();
      showMessage(`Task marked as ${completed ? "incomplete" : "completed"}`, "info");
    } catch (error) {
      showMessage(`${error.message}`, "error");
    }
  };

  const removeTask = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`);
      fetchTasks();
      showMessage("Task deleted successfully", "success");
    } catch (error) {
      showMessage(`${error.message}`, "error");
    }
  };

  return (
    <>
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
            {completed ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
          </IconButton>

          <ListItem
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => setConfirmOpen(true)}
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
                  {description && <Typography variant="body2">{description}</Typography>}
                  <Typography variant="caption" color="text.secondary">
                    {new Date(createdAt).toLocaleString()}
                  </Typography>
                </Stack>
              }
            />
          </ListItem>
        </Paper>
      </Fade>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={removeTask} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Task;
