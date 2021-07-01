import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Backdrop,
  IconButton,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

const GameReview = ({ open, onClose, goToURL }) => {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const classes = useStyles();
  const inputRef = useRef(null);
  const history = useHistory();
  const url = process.env["REACT_APP_API_URL"];

  const changeRating = (rating) => {
    setRating(rating);
  };

  const copyContent = (type) => {
    const text = `Hey!\nCheck out this amazing website at http://localhost:3000 for easy dyslexia diagnosis.I made my kid play their game and answer the questions and he enjoyed alot! You should try it out as well.
    `;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log(text);
        if (type === "whatsapp") {
          window.open("https://web.whatsapp.com/", "_blank");
        }
      });
    }
  };

  const onSubmit = () => {
    setStatus({ ...status, loading: true });
    const token = sessionStorage.getItem("token");
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (token) {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
    }
    const data = {
      feedback: inputRef.current.value,
      rating: rating,
    };
    fetch(`${url}/api/v1/addFeedback`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((respJSON) => {
        console.log(respJSON);
        if (respJSON.error.length === 0) {
          setStatus({ loading: false, success: true, error: "" });
          console.log(rating);
          console.log(inputRef.current.value);
          onClose();
          setTimeout(() => {
            history.replace(goToURL);
          }, 500);
        } else {
          console.log(respJSON.error);
          setStatus({ loading: false, success: false, error: respJSON.error });
          onClose();
          setTimeout(() => {
            history.replace(goToURL);
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus({ loading: false, success: false, error: err.message });
        onClose();
      });
  };
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <ReviewCard>
        <Heading className="row">
          <h2>Give Us A Review</h2>
        </Heading>
        <div
          className="row"
          style={{
            margin: "0px 5px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Rating className="col-6">
            <p style={{ paddingTop: 10, paddingRight: 5, margin: 0 }}>
              Rating:
            </p>
            <StarRatings
              rating={rating}
              changeRating={changeRating}
              starHoverColor="yellow"
              starRatedColor="yellow"
              numberOfStars={5}
              name="rating"
              starDimension="2vw"
              starSpacing="3px"
            />
          </Rating>
          <Share className="col-6">
            <p
              style={{
                paddingTop: 10,
                paddingRight: 5,
                margin: 0,
                paddingBottom: 10,
              }}
            >
              Share:
            </p>
            <div>
              <IconButton
                style={{
                  padding: 0,
                  margin: 2,
                }}
                onClick={() => {
                  copyContent("whatsapp");
                }}
              >
                <FaWhatsappSquare color="#00d620" size="2.3vw" />
              </IconButton>
              <IconButton
                style={{
                  padding: 0,
                  margin: 2,
                }}
                onClick={() => copyContent("clipboard")}
              >
                <MdContentCopy color="white" size="2.2vw" />
              </IconButton>
            </div>
          </Share>
        </div>
        <div className="row" style={{ width: "100%", height: "30%" }}>
          <Feedback className="col-12">
            <InputTextField
              id="outlined-multiline-flexible"
              placeholder="Give Us A Feedback"
              multiline
              rowsMax={4}
              inputRef={inputRef}
              variant="outlined"
            />
          </Feedback>
        </div>

        <NavButtons className="row">
          <PlayButton onClick={onSubmit}>
            {status.loading ? (
              <CircularProgress color="white" size={30} />
            ) : status.success ? (
              <IoIosCheckmarkCircleOutline color="white" size={30} />
            ) : (
              "Submit"
            )}
          </PlayButton>
          <ExitButton
            onClick={() => {
              onClose();
              setTimeout(() => {
                history.replace(goToURL);
              }, 500);
            }}
          >
            Cancel
          </ExitButton>
        </NavButtons>
      </ReviewCard>
    </Backdrop>
  );
};

export default GameReview;
const Feedback = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
`;
const Share = styled.div`
  font-size: 1.5vw;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 5px;
  margin: 0px;
`;
const Rating = styled.div`
  font-size: 1.5vw;
  display: flex;
  align-items: flex-end;
  padding-bottom: 15px;
  margin: 0px;
  height: 100%;
`;
const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
`;
const ReviewCard = styled.div`
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, #388258, #0e0e13);
  border-radius: 20px;
  border: 6px solid #5bc45f;
  width: 50vw;
  height: 30vw;
  align-items: center;
  justify-content: space-evenly;
`;

const PlayButton = styled.button`
  border-radius: 7px;
  margin: 2px 10px;
  border: none;
  color: white;
  background-color: #3fcb6e;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 80%;
  transition: 0.15s ease-out;
  &:hover {
    background-color: #209146;
    transition: 0.15s ease-out;
  }
  &:active {
    transform: translateY(5px);
    transition: 0.15s ease-out;
  }
`;

const ExitButton = styled.button`
  border-radius: 7px;
  margin: 2px 10px;
  border: none;
  color: white;
  background-color: #cb3f3f;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 30%;
  height: 80%;
  transition: 0.15s ease-out;
  &:hover {
    background-color: #9c2222;
    transition: 0.15s ease-out;
  }
  &:active {
    transform: translateY(5px);
    transition: 0.15s ease-out;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15%;
  width: 100%;
`;

const InputTextField = withStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "2px",
    color: "black",
    width: "100%",
    height: "100%",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFFFFF",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: "1px",
        borderColor: "#FFFFFF",
        width: "100%",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFFFFF",
      },
      "& .MuiOutlinedInput-input": {
        fontSize: "1.2vw",
      },
    },
  },
})(TextField);

const useStyles = makeStyles(({ theme }) => ({
  backdrop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
}));
