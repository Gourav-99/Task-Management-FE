import React, { useState, useEffect } from "react";
import {
  List,
  Stack,
  Chip,
  Button,
  Pagination,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTaskContext } from "../context/TaskContext";
import Task from "./Task";

const TaskList = () => {
  const { state, setQuery } = useTaskContext();
  const { tasks, query, loading } = state;
  const { page, limit, filter, sort, search } = query;
  const [searchParam, setSearchParam] = useState(search || "");

  useEffect(() => {
    if (searchParam === search) return;
    const timer = setTimeout(() => {
      setQuery({ search: searchParam, page: 1 });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchParam]);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(160deg,#ffffff,#f8fbff)",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <Stack direction="row" spacing={1} flexWrap="nowrap">
          {["all", "completed", "notcompleted"].map((val) => (
            <Chip
              key={val}
              label={
                val === "all"
                  ? "All"
                  : val === "completed"
                  ? "Completed"
                  : "Not Completed"
              }
              color={filter === val ? "primary" : "default"}
              onClick={() => setQuery({ filter: val, page: 1 })}
            />
          ))}
        </Stack>

        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            setQuery({ sort: sort === "asc" ? "desc" : "asc", page: 1 })
          }
        >
          {sort === "asc" ? "Oldest First" : "Newest First"}
        </Button>
        <TextField
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Search tasks..."
          size="small"
          sx={{ flex: 1, maxWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <List sx={{ flexGrow: 1, overflowY: "auto" }}>
        {loading ? (
          <Stack alignItems="center" justifyContent="center" flex={1} p={3}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" mt={2}>
              Loading tasks...
            </Typography>
          </Stack>
        ) : tasks.total ? (
          tasks.tasks.map((task) => <Task key={task.id} {...task} />)
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            flex={1}
            spacing={2}
            p={3}
          >
            <img
              src="/task-past-due-symbolic-svgrepo-com.svg"
              alt="No tasks"
              style={{ maxWidth: "200px", opacity: 0.8 }}
            />
            <Typography variant="h6" color="text.secondary">
              You’re all caught up!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No tasks to show. Start by adding a new task.
            </Typography>
          </Stack>
        )}
      </List>

      {tasks.total > limit && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            count={Math.ceil((tasks?.total || 0) / limit)}
            page={page}
            onChange={(e, value) => setQuery({ page: value })}
            color="primary"
          />
        </Stack>
      )}
    </Paper>
  );
};

export default TaskList;
