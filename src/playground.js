import React, { Component } from "react";
import { TextField, MenuItem } from "@material-ui/core";

export default class Playground extends Component {
  state = {
    value1: "",
    value2: "",
  };
  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <div
        className="container flex flex-column "
        style={{
          minHeight: "100vh",
          minWidth: "100%",
          backgroundColor: "#eee",
        }}
      >
        {dummyData.map((item, index) => {
          return (
            <div key={index}>
              <div style={{ fontSize: 36 }}>{item.question}</div>
              {item.select ? (
                <TextField
                  select
                  defaultValue=""
                  value={index}
                  label={item.select ? "Select Value" : "Enter Value"}
                  style={{ width: 240 }}
                  onChange={(event) =>
                    this.handleChange(`value${index}`, event.target.value)
                  }
                >
                  {item.select && (
                    <>
                      {item.answers.map((item, index) => {
                        return <MenuItem key={index}>{item}</MenuItem>;
                      })}
                    </>
                  )}
                </TextField>
              ) : (
                <TextField
                  label={item.select ? "Select Value" : "Enter Value"}
                  style={{ width: 240 }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const dummyData = [
  {
    question: "Who is Alam?",
    select: false,
  },
  {
    question: "What is alam?",
    select: true,
    answers: ["IDK", "BSDK", "Naughty Boy"],
  },
  {
    question: "Why is alam?",
    select: true,
    answers: ["To design sexy UI for me!", "Whatever ~_~"],
  },
];
