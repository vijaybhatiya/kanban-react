import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Grid, Paper } from "@material-ui/core";
import { BoardsList } from "../components/BoardsList";
import { BoardHeader } from "../components/BoardHeader";
import { BoardFooter } from "../components/BoardFooter";
import axios from "axios";
import { connect } from "react-redux";
import { getTasks } from "../redux/actions/tasks";

const url = "/db.json";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    flex: "1 1 auto",
    height: "100%",
  },
  boardsWrap: {
    display: "flex",
    flex: "1 1 auto",
    overflowX: "auto",
    overflowY: "hidden",
    height: "100%",
  },
  boardsContent: {
    display: "flex",
    paddingTop: "24px",
    paddingBottom: "24px",
    height: "100%",
  },
  boardCard: {
    width: "380px",
    display: "flex",
    maxHeight: "100%",
    overflowX: "hidden",
    overflowY: "hidden",
    marginLeft: "8px",
    marginRight: "8px",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
  boardButton: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

const TasksPage = ({ tasks, getTasks }) => {
  const classes = useStyles();

  useEffect(() => {
    const loading = async () => {
      try {
        const res = await axios.get(url);
        getTasks(res.data.tasksList);
      } catch (error) {
        console.log("Error", error);
      }
    };
    loading();
  }, [getTasks]);

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid container className={classes.boardsWrap}>
        <Grid className={classes.boardsContent}>
          {tasks &&
            tasks.map((task) => {
              return (
                <Paper
                  key={task.id}
                  elevation={3}
                  className={classes.boardCard}
                >
                  <BoardHeader title={task.title} />
                  <Divider />
                  <BoardsList boards={task.boards} />
                  <Divider className={classes.divider} />
                  <BoardFooter />
                </Paper>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasksList,
  };
};

const mapDispatchToProps = {
  getTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
