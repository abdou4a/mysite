import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import {
  FormControlLabel,
  IconButton,
  makeStyles,
  Switch,
  ThemeProvider,
  Typography
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles({
  list: {
    "&::-webkit-scrollbar": {
      width: "15px",
      height: "20px"
    },

    "&::-webkit-scrollbar-thumb": {
      height: "6px",
      border: "4px solid rgba(0, 0, 0, 0)",
      "background-clip": "padding-box",
      "-webkit-border-radius": "7px",
      "background-color": "rgba(0, 0, 0, 0.15)",
      "-webkit-box-shadow":
        "inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05)"
    },

    "&::-webkit-scrollbar-button": {
      width: 0,
      height: 0,
      display: "none"
    },

    "&::-webkit-scrollbar-corner": {
      "background-color": "transparent"
    }
  }
});

export default function FormDialog(props) {
  const classes = useStyles();
  const [multiChoice, setmultiChoice] = React.useState(false);
  const [choices, setChoices] = React.useState(["", ""]);
  const handleChoiceChange = (e) => {
    let items = [...choices];
    items[e.target.id] = e.target.value;
    setChoices(items);
  };
  const handleAddChoice = () => {
    let items = [...choices];
    items.push("");
    setChoices(items);
  };
  const handleRemoveChoice = () => {
    if (choices.length > 2) {
      let items = [...choices];
      setChoices(items.slice(0, items.length - 1));
    }
  };

  const [selectedDate, setSelectedDate] = React.useState(Date.now());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <ThemeProvider>
      <Dialog
        open={props.open}
        onClose={() => props.onChangeOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Question</DialogTitle>
        <DialogContent className={classes.list}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Question Text"
            type="Text"
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={multiChoice}
                onChange={() => setmultiChoice(!multiChoice)}
                name="checkedA"
              />
            }
            label="Muti-choice"
          />
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Valid until"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Typography>
            Choices:
            <IconButton color="primary" onClick={handleAddChoice}>
              <AddCircleIcon />
            </IconButton>
            <IconButton color="secondary" onClick={handleRemoveChoice}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Typography>
          {choices.map((ch, i) => {
            return (
              <TextField
                value={ch}
                onChange={handleChoiceChange}
                id={i}
                margin="dense"
                label={"Choice " + (i + 1)}
                type="Text"
                fullWidth
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onChangeOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => props.onChangeOpen(false)}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
