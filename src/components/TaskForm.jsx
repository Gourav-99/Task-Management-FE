import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useTaskContext } from "../context/TaskContext";
import { useSnackbar } from "../context/SnackbarProvider";

const TaskForm = () => {
  const { fetchTasks } = useTaskContext();
  const { showMessage } = useSnackbar();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tasks`, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      fetchTasks();
      setError("");
      showMessage("Task added successfully!", "success");
    } catch (error) {
      showMessage(`${error?.response?.data?.message}`, "error");
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(160deg, #ffffff, #f9fcff)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
        Add New Task
      </Typography>

      <Box width="100%" component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Task Title"
            required
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={Boolean(error)}
            helperText={error}
          />
          <TextField
            label="Task Description"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            sx={{
              alignSelf: "flex-start",
              borderRadius: 3,
              px: 3,
              textTransform: "none",
            }}
          >
            Add Task
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default TaskForm;
