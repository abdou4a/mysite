import React from "react";
import Masonry from "react-masonry-css";
import SimpleCard from "./SimpleCard";
import "./style.css";
import data from "./Data";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import NewQuestionDialog from "./NewQuestionDialog";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    960: 2,
    600: 1
  };
  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((qtn, i) => {
          return <SimpleCard key={i} question={qtn} />;
        })}
      </Masonry>
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <NewQuestionDialog open={open} onChangeOpen={setOpen} />
    </>
  );
}
