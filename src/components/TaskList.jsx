import React from "react";
import { List, Stack, Chip, Button, Pagination, Paper } from "@mui/material";
import { useTaskContext } from "../context/TaskContext";
import Task from "./Task";

const TaskList = () => {
  const { state, setQuery } = useTaskContext();
  const { tasks, query } = state;
  const { page, limit, filter, sort } = query;

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
        direction="row"
        spacing={1}
        mb={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            label="All"
            color={filter === "all" ? "primary" : "default"}
            onClick={() => setQuery({ filter: "all", page: 1 })}
          />
          <Chip
            label="Completed"
            color={filter === "completed" ? "primary" : "default"}
            onClick={() => setQuery({ filter: "completed", page: 1 })}
          />
          <Chip
            label="Not Completed"
            color={filter === "notcompleted" ? "primary" : "default"}
            onClick={() => setQuery({ filter: "notcompleted", page: 1 })}
          />
        </Stack>

        <Button
          variant="outlined"
          size="small"
          onClick={() => setQuery({ sort: sort === "asc" ? "desc" : "asc" })}
        >
          {sort === "asc" ? "Oldest First" : "Newest First"}
        </Button>
      </Stack>

      <List sx={{ flexGrow: 1, overflowY: "auto" }}>
        {tasks.total ? (
          tasks.tasks.map((task) => <Task key={task.id} {...task} />)
        ) : (
          <Stack alignItems="center" mb={2}>
            <Chip label="No tasks found" color="warning" variant="outlined" />
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
