import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

export default function SimpleCard(props) {
  const { question } = props;

  let selectedChoice = null;
  let choices = {};
  if (!question.multiChoice) {
    let sel = question.choices.filter((v) => v.voted);
    if (sel.length > 0) {
      selectedChoice = sel[0].choice;
    }
  } else {
    question.choices.forEach((v) => {
      choices[v.choice] = v.voted ? true : false;
    });
  }
  let total = 0;
  question.choices.forEach((v) => {
    total += parseInt(v.votes);
  });
  const [totalVotes, setTotalVotes] = React.useState(total > 0 ? total : 1);

  const [checked, setChecked] = React.useState(choices);
  const [choiceChanged, setChoiceChanged] = React.useState(false);
  const [value, setValue] = React.useState(selectedChoice);
  const handleChangeCheck = (event) => {
    setChoiceChanged(true);
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };
  const handleChange = (event) => {
    setValue(event.target.value);
    setChoiceChanged(true);
  };

  const handleVote = () => {
    setChoiceChanged(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {question.questionText}
        </Typography>
        {question.multiChoice ? (
          question.choices.map((ch) => {
            return (
              <div key={ch.choice}>
                {question.canVote ? (
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked[ch.choice]}
                          onChange={handleChangeCheck}
                          name={ch.choice}
                        />
                      }
                      label={ch.choice}
                      style={{ flexGrow: 1 }}
                    />
                    <Typography
                      style={{ alignSelf: "flex-end" }}
                      component="span"
                    >
                      {ch.votes +
                        " (" +
                        ((ch.votes * 100) / totalVotes).toFixed(1) +
                        "%)"}
                    </Typography>
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    <Typography style={{ flexGrow: 1 }}>{ch.choice}</Typography>
                    <Typography
                      style={{ alignSelf: "flex-end" }}
                      component="span"
                    >
                      {ch.votes +
                        " (" +
                        ((ch.votes * 100) / totalVotes).toFixed(1) +
                        "%)"}
                    </Typography>
                  </div>
                )}

                <LinearProgress
                  variant="determinate"
                  value={(ch.votes * 100) / totalVotes}
                />
              </div>
            );
          })
        ) : (
          <RadioGroup value={value} onChange={handleChange}>
            {question.choices.map((ch) => {
              return (
                <div key={ch.choice}>
                  {question.canVote ? (
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        value={ch.choice}
                        control={<Radio />}
                        label={ch.choice}
                        style={{ flexGrow: 1 }}
                      />
                      <Typography
                        style={{ alignSelf: "flex-end" }}
                        component="span"
                      >
                        {ch.votes +
                          " (" +
                          ((ch.votes * 100) / totalVotes).toFixed(1) +
                          "%)"}
                      </Typography>
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      <Typography style={{ flexGrow: 1 }}>
                        {ch.choice}
                      </Typography>
                      <Typography
                        style={{ alignSelf: "flex-end" }}
                        component="span"
                      >
                        {ch.votes +
                          " (" +
                          ((ch.votes * 100) / totalVotes).toFixed(1) +
                          "%)"}
                      </Typography>
                    </div>
                  )}

                  <LinearProgress
                    variant="determinate"
                    value={(ch.votes * 100) / totalVotes}
                  />
                </div>
              );
            })}
          </RadioGroup>
        )}
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        {question.canVote ? (
          <Button
            size="small"
            onClick={handleVote}
            variant="contained"
            disabled={!choiceChanged}
            color="secondary"
          >
            Vote
          </Button>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
}
