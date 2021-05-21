import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { QuestionScore } from "../Components";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, CircularProgress, Snackbar, Icon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { BarChart, ShowChart } from "@material-ui/icons";
import { Bar, Line } from "react-chartjs-2";
import image from "../Images/backgrounds/profilebg.png";
import upload from "../Images/backgrounds/photo.svg";
import remove from "../Images/backgrounds/eraser.svg";
import edit from "../Images/backgrounds/pencil.svg";
import dp from "../Images/backgrounds/UploadIcon.svg";
import save from "../Images/backgrounds/save.png";
import bg from "../Images/backgrounds/gamebg.png";

const ProfileTracking = () => {
  const [editinfo, setEditinfo] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(1);
  const [data, setData] = useState({
    username: "",
    phone: "",
    parentName: "",
    childName: "",
    age: "",
    gender: "",
    email: "",
    country: "",
    city: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    message: "",
    info: false,
  });
  const url = process.env["REACT_APP_API_URL"];

  const SetReadState = () => {
    setEditinfo(!editinfo);
  };

  const navigate = (nav) => {
    setActiveNav(nav);
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setImgFile(e.target.files[0]);
    setFileType(e.target.files[0].type);
    setEditinfo(true);
  };

  const fetchData = () => {
    const token = sessionStorage.getItem("token");
    fetch(`${url}/api/v1/getUserData`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((respJSON) => {
        const dataJson = respJSON.data;
        setData({
          username: dataJson.username || "",
          phone: dataJson.phone || "",
          parentName: dataJson.parentName || "",
          childName: dataJson.childName || "",
          age: dataJson.childAge || "",
          gender: dataJson.gender || "",
          email: dataJson.email || "",
          country: dataJson.country || "",
          city: dataJson.city || "",
        });
        const pfp = respJSON.data.pfp;
        if (pfp) {
          let ext = pfp.split(",")[0];
          ext = ext.slice(ext.indexOf(":") + 1, ext.indexOf(";"));
          setFileType(ext);
          fetch(respJSON.data.pfp)
            .then((resp) => resp.blob())
            .then((blob) => {
              //   blob.type = ext;
              setImgFile(blob);
              const url = URL.createObjectURL(blob);
              sessionStorage.setItem("pfp", JSON.stringify(url));
              setPreview(url);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err.message);
        setStatus({
          loading: false,
          success: false,
          message: "Failed to fetch. Please refresh the page.",
        });
        setOpen(true);
      });
  };

  const deleteImage = () => {
    setPreview(null);
    setImgFile(null);
    setEditinfo(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSave = () => {
    const fd = new FormData();
    imgFile && fd.append("file", imgFile);
    fileType && imgFile && fd.append("fileType", fileType);
    fd.append("data", JSON.stringify(data));
    const token = sessionStorage.getItem("token");
    setStatus({ ...status, loading: true });
    fetch(`${url}/api/v1/updateProfileData`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        // "Content-Type": "application/json",
      },
      body: fd,
    })
      .then((resp) => resp.json())
      .then((respJSON) => {
        if (respJSON.error.trim().length === 0) {
          if (respJSON.token) {
            sessionStorage.setItem("token", respJSON.token);
          }
          setStatus({
            loading: false,
            success: true,
            message: respJSON.message.trim(),
          });
          preview && sessionStorage.setItem("pfp", JSON.stringify(preview));
        } else {
          setStatus({
            loading: false,
            success: false,
            message: respJSON.error.trim(),
          });
        }
        setOpen(true);
        setEditinfo(false);
      })
      .catch((err) => {
        console.log(err.message);
        setStatus({
          loading: false,
          success: false,
          message: "Failed to fetch. Please refresh the page.",
        });
        setOpen(true);
        setEditinfo(false);
      });
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    fetchData();
  }, []);

  const UploadImgJSX = (
    <ImgDisplay>
      <Dpic src={dp} alt="image" width="25%" />
      <br />
      Upload Your Photo
    </ImgDisplay>
  );

  const ImageJSX = (
    <ImgDisplay>
      <Dpic src={preview} alt="pfp" width="100%" height="100%" />
    </ImgDisplay>
  );

  return (
    <Background className="container-fluid" background={image}>
      <ProfileInfo className="row">
        <Profileimg className="col-4">
          {!preview ? UploadImgJSX : ImageJSX}
          <SetButtons>
            <Selectimg htmlFor="imgUpload">
              <input
                type="file"
                id="imgUpload"
                accept=".jpg, .jpeg, .png"
                onChange={onSelectFile}
                hidden
              />
              <Span>
                <MyIcon iconimg={upload} />
                Upload
              </Span>
            </Selectimg>
            <Deleteimg onClick={deleteImage}>
              <Span>
                <MyIcon iconimg={remove} />
                Delete
              </Span>
            </Deleteimg>
          </SetButtons>
        </Profileimg>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            severity={status.success ? "success" : "error"}
            onClose={handleClose}
          >
            {status.message}
          </Alert>
        </Snackbar>
        <ProfileDetails className="col-8">
          <Row1 className="row">
            <Col1 className="col-6">
              <DisabledTextField
                label="Username"
                variant="outlined"
                name="username"
                placeholder="Username"
                type="text"
                value={data.username || ""}
                disabled={true}
                onClick={() => data.username}
              />
            </Col1>
            <Col1 className="col-6">
              <InputTextField
                name="phone"
                label="Phone"
                placeholder="Phone Number"
                type="text"
                variant="outlined"
                value={data.phone || ""}
                disabled={!editinfo}
                onChange={onChange}
              />
            </Col1>
          </Row1>
          <Row1 className="row">
            <Col1 className="col-6">
              <InputTextField
                name="parentName"
                label="Parent's Name"
                placeholder="Parent's Name"
                type="text"
                variant="outlined"
                value={data.parentName || ""}
                disabled={!editinfo}
                onChange={onChange}
              />
            </Col1>
            <Col1 className="col-6">
              <InputTextField
                name="childName"
                label="Child's Name"
                placeholder="Child's Name"
                variant="outlined"
                type="text"
                value={data.childName || ""}
                disabled={!editinfo}
                onChange={onChange}
              />
            </Col1>
          </Row1>
          <Row1 className="row">
            <Col1 className="col-3">
              <InputTextField
                name="age"
                label="Age"
                placeholder="Age"
                type="number"
                variant="outlined"
                value={data.age || ""}
                disabled={!editinfo}
                onChange={onChange}
              />
            </Col1>
            <Col1 className="col-3">
              <InputTextField
                name="gender"
                label="Gender"
                type="text"
                placeholder="Gender"
                variant="outlined"
                value={data.gender || ""}
                disabled={!editinfo}
                onChange={onChange}
              />
            </Col1>
            <Col1 className="col-6">
              <DisabledTextField
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
                variant="outlined"
                value={data.email || ""}
                disabled={true}
              />
            </Col1>
          </Row1>
          <Row1 className="row">
            <Col1 className="col-5">
              <InputTextField
                name="country"
                label="Country"
                placeholder="Country"
                type="text"
                variant="outlined"
                value={data.country || ""}
                disabled={!editinfo}
                onChange={onChange}
              />
            </Col1>
            <Col1 className="col-5">
              <InputTextField
                name="city"
                label="City"
                placeholder="City"
                type="text"
                variant="outlined"
                value={data.city || ""}
                disabled={!editinfo}
                onChange={onChange}
              />
            </Col1>
            <Col1 className="col-2">
              <Editinfo onClick={SetReadState}>
                {status.loading ? (
                  <CircularProgress size={30} />
                ) : !editinfo ? (
                  <Span>
                    Edit <MyIcon iconimg={edit}></MyIcon>
                  </Span>
                ) : (
                  <Span onClick={onSave}>
                    Save <MyIcon iconimg={save}></MyIcon>
                  </Span>
                )}
              </Editinfo>
            </Col1>
          </Row1>
        </ProfileDetails>
      </ProfileInfo>
      <GamePerformance className="row">
        <Title className="row">
          <h1>Child's Performance</h1>
        </Title>
        <ChartContainer>
          <ChartButton>
            <NavButton onClick={() => navigate(1)}>Scoreboards</NavButton>
            <NavButton onClick={() => navigate(2)}>
              Dyslexic Prediction
            </NavButton>
            <NavButton onClick={() => navigate(3)}>Improvement Graph</NavButton>
          </ChartButton>
          {activeNav === 1 ? (
            <ScoreBoard />
          ) : activeNav === 2 ? (
            <PredictionBoard />
          ) : (
            <GraphBoard />
          )}
        </ChartContainer>
      </GamePerformance>
    </Background>
  );
};

export default ProfileTracking;

const ScoreBoard = () => {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    message: "",
  });
  const url = process.env["REACT_APP_API_URL"];
  const [score, setScore] = useState([]);
  const [level, setLevel] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchScoreData = () => {
    const token = sessionStorage.getItem("token");
    fetch(`${url}/api/v1/getUserScore`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((respJSON) => {
        const scores = respJSON.scores.scores;
        if (scores.length === 0) {
          setScore(scores);
          setLevel(respJSON.scores.level);
          setStatus({
            loading: false,
            success: true,
            message: respJSON.message,
          });
        }
        setScore(respJSON.scores.scores);
        setLevel(respJSON.scores.level);
        setStatus({ loading: false, success: true, message: "" });
      })
      .catch((err) => {
        console.log(err);
        setStatus({ loading: false, success: false, message: err.message });
        setOpen(true);
      });
  };

  useEffect(() => {
    setStatus({ ...status, loading: true });
    fetchScoreData();
  }, []);

  return (
    <NavBackground>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="error" onClose={handleClose}>
          Could not load data, please try again!
        </Alert>
      </Snackbar>
      {status.loading ? (
        <CircularProgress size={80} style={{ color: "white" }} />
      ) : score.length === 0 ? (
        <NoRecord>No Previous Record Found</NoRecord>
      ) : (
        <>
          <TopBar className="row">
            <ScoreBoardTitle>
              {level === "" ? "" : `Last Played: ${level} Level`}
            </ScoreBoardTitle>
          </TopBar>
          <QuestionContainer>
            {score.map((el, i) => {
              return <QuestionScore index={i} key={i} answer={el.score} />;
            })}
          </QuestionContainer>
        </>
      )}
    </NavBackground>
  );
};

const PredictionBoard = () => {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    message: "",
  });
  const url = process.env["REACT_APP_API_URL"];
  const [open, setOpen] = useState(false);
  const [noRecord, setNoRecord] = useState(false);
  const [diagnosis, setDiagnosis] = useState({
    accuracy: 0,
    dyslexic: false,
  });
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const getPrediction = () => {
    const token = sessionStorage.getItem("token");
    fetch(`${url}/api/v1/getTrackHistory`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((respJSON) => {
        if (respJSON.data) {
          const data = respJSON.data.latestDiagnosis;
          const dyslexic =
            data.diagnosis.trim().toLowerCase() === "yes" ? true : false;
          setDiagnosis({
            accuracy: data.accuracy,
            dyslexic: diagnosis,
          });
          if (dyslexic) {
            setMsg1(`Unfortunately your child has been diagnosed with DYSLEXIA with the
            prediction accuracy of ${data.accuracy}%.`);
            setMsg2(`We would recommend that you consider any of the nearest
            educational psycologist for your child. The psycologist will help
            your child in improving his condition.`);
          } else {
            setMsg1("Congratulations! Your child is NOT DYSLEXIC.");
            setMsg2(
              "No need to worry. However, if you think our prediction is incorrect, you should consult a professional psychologist as soon as possible."
            );
          }
          setStatus({ loading: false, success: true, message: "Success!" });
        } else {
          setNoRecord(true);
          setStatus({
            loading: false,
            success: true,
            message: "No previous record found!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          loading: false,
          success: false,
          message: "Error, please try again!",
        });
        setOpen(true);
      });
  };

  useEffect(() => {
    setStatus({ ...status, loading: true });
    getPrediction();
  }, []);

  return (
    <NavBackground>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="error" onClose={handleClose}>
          Could not load data, please try again!
        </Alert>
      </Snackbar>
      {status.loading ? (
        <CircularProgress size={80} style={{ color: "white" }} />
      ) : noRecord ? (
        <NoRecord>No Previous Record Found</NoRecord>
      ) : (
        <PredictionContainer>
          <Span className="row">
            <ScoreBoardTitle>Dyslexic Prediction</ScoreBoardTitle>
          </Span>
          <Span>
            <Prediction color={diagnosis.dyslexic ? "#ff6161" : "#6bff93"}>
              {diagnosis.accuracy}%
            </Prediction>
          </Span>

          <Span className="row">
            <Msg
              color={diagnosis.dyslexic ? "#ff6161" : "#6bff93"}
              fontSize="1.5vw"
            >
              {msg1}
            </Msg>
          </Span>
          <Span className="row">
            <Msg fontSize="1.2vw">{msg2}</Msg>
          </Span>
        </PredictionContainer>
      )}
    </NavBackground>
  );
};

const GraphBoard = () => {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    message: "",
  });
  const url = process.env["REACT_APP_API_URL"];
  const [open, setOpen] = useState(false);
  const [noRecord, setNoRecord] = useState(false);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [chartType, setChartType] = useState("line");

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = (val) => {
    setChartType(val);
  };

  const getGraphData = () => {
    const token = sessionStorage.getItem("token");
    fetch(`${url}/api/v1/getTrackHistory`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((respJSON) => {
        if (respJSON.data) {
          const data = respJSON.data;
          if (data.trackRecord) {
            setXAxis(data.trackRecord.xAxis);
            setYAxis(data.trackRecord.yAxis);
            setStatus({
              loading: false,
              success: true,
              message: "graph loading successfully!",
            });
          } else {
            setNoRecord(true);
            setStatus({
              loading: false,
              success: true,
              message: "No previous record found!",
            });
          }
        } else {
          setNoRecord(true);
          setStatus({
            loading: false,
            success: true,
            message: "No previous record found!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          loading: false,
          success: false,
          message: "Error, please try again!",
        });
        setOpen(true);
      });
  };

  useEffect(() => {
    setStatus({ ...status, loading: true });
    getGraphData();
  }, []);

  return (
    <BoardContainer>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="error" onClose={handleClose}>
          Could not load data, please try again!
        </Alert>
      </Snackbar>
      {status.loading ? (
        <CircularProgress size={80} style={{ color: "white" }} />
      ) : noRecord ? (
        <NoRecord color="black">No Previous Record Found</NoRecord>
      ) : chartType === "line" ? (
        <Line
          data={{
            labels: xAxis,
            datasets: [
              {
                label: "Average Score",
                data: yAxis,
                backgroundColor: "#5bc45f",
                borderWidth: 4,
                borderColor: "#5bc45f",
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <Bar
          data={{
            labels: xAxis,
            datasets: [
              {
                label: "Average Score",
                data: yAxis,
                backgroundColor: "#f7ca34",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
      {!status.loading && !noRecord && (
        <GraphButtonsContainer>
          <GraphButton onClick={() => onClick("line")}>
            <Icon
              style={{
                color: "#5bc45f",
                margin: "2px 5px",
                justifySelf: "center",
              }}
            >
              <ShowChart />
            </Icon>
            Line
          </GraphButton>
          <GraphButton onClick={() => onClick("bar")}>
            <Icon
              style={{
                color: "#f7ca34",
                margin: "2px 5px",
                justifySelf: "center",
              }}
            >
              <BarChart />
            </Icon>
            Bar
          </GraphButton>
        </GraphButtonsContainer>
      )}
    </BoardContainer>
  );
};

const QuestionContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 50% 50%;
  grid-column-gap: 5vw;
  grid-row-gap: 0.1vw;

  padding-left: 5vw;
  padding-right: 5vw;
  grid-row: auto auto;
  align-items: center;
  overflow-y: scroll;
  justify-content: space-around;
`;
const ScoreBoardTitle = styled.div`
  font-size: 2vw;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  color: #fff;
  text-transform: capitalize;
`;
const TopBar = styled.div`
  height: 13%;
  width: 100%;

  display: flex;
  padding-top: 1.5vw;
  padding-bottom: 1.5vw;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Profiledp = styled.div`
  background-color: red;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

const NavBackground = styled.div`
  padding-left: 1vw;
  padding-right: 1vw;
  padding-bottom: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 95%;
  width: 80%;
  background-image: linear-gradient(to bottom, #388258, #0e0e13);
  color: white;
  border: 6px solid #5bc45f;
  border-radius: 10px;
  margin: 5px 20px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4a566e;
  border: none;
  width: 95%;
  height: 10%;
  color: white;
  font-size: 1.3vw;
  font-weight: bold;
  border-radius: 10px;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #19d14a;
    transition: 0.3s ease-in-out;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    background-color: #19d14a;
    transition: 0.3s ease-in-out;
  }
  &:active {
    transform: translateY(5px);
  }
`;
const ChartGraphs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 90%;
  margin-right: 2vw;
  margin-left: 2vw;
  background-color: white;
  border-radius: 6px;
`;

const BoardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90%;
  width: 80%;
  margin-right: 2vw;
  margin-left: 2vw;
  background-color: #ecece6;
  border-radius: 6px;
`;

const ChartButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 20%;
  height: 95%;
  margin-left: 2vw;
  background-color: #4a566e;
  border-radius: 22px;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 90%;
  width: 90%;
  background-color: #b9b9a3;
  border-radius: 22px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  height: 10vh;
  margin: 10px 5px;
`;
const GamePerformance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100vh;
`;
const Background = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  flex-direction: column;
  background-image: url(${({ background }) => background});
  height: 200vh;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.4);
  background-blend-mode: darken;
`;
const Dpic = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: ${({ width }) => width};
  height: ${({ height }) => height}
  object-fit:contain;
`;
const ProfileInfo = styled.div`
  height: 80vh;
`;

const Profileimg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ImgDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 70%;
  width: 75%;
  background-color: #d1d1d1;
  margin: 0px;
  padding: 0px;
`;

const SetButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  height: 10%;
  border-radius: 25px;
`;

const MyIcon = styled.div`
  background: url(${({ iconimg }) => iconimg});
  height: 2vw;
  width: 2vw;
  margin: 0px 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Selectimg = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #333333;
  width: 50%;
  height: 100%;
  border: 0.1px solid #333333;
  font-weight: bold;
  border-bottom-left-radius: 25px;
  &:hover {
    box-shadow: 5px 8px 10px rgba(0, 0, 0, 0.3);
    transition: 0.2s ease-in-out;
    border: none;
    background-color: #a8adad;
  }
  cursor: pointer;
`;
const Deleteimg = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #333333;
  width: 50%;
  height: 100%;
  border: 0.1px solid #333333;
  font-weight: bold;
  border-bottom-right-radius: 25px;
  &:hover {
    box-shadow: 5px 8px 10px rgba(0, 0, 0, 0.3);
    transition: 0.2s ease-in-out;
    border: none;
    background-color: #a8adad;
  }
`;
const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const Row1 = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Col1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Editinfo = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  border: none;
  color: #333333;
  font-weight: bold;

  box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.16);

  &:hover {
    box-shadow: 5px 8px 10px rgba(0, 0, 0, 0.3);
    transition: 0.3s ease-in-out;
    border: none;
    background-color: #a8adad;
  }
`;

const Span = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoRecord = styled.div`
  color: ${({color})=>color? color:"white"};
  font-size: 2.5vw;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
`;

const Prediction = styled.h1`
  color: ${({ color }) => color};
  font-size: 5vw;
  padding: 10px;
  margin: 20px 10px;
`;

const PredictionContainer = styled.div`
  display: flex;
  align-item: flex-start;
  flex-direction: column;
  width: 80%;
  height: 100%;
  padding: 15px;
  margin: 5px;
`;

const Msg = styled.p`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  padding: 5px;
  margin: 10px;
`;

const GraphButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  margin-top: 10px;
  height: 10%;
  width: 80%;
`;

const GraphButton = styled.div`
  background-color: #ede8e8;
  border: none;
  border-radius: 5px;
  width: 15%;
  margin: 5px 25px;
  padding: 2px 5px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #e0dede;
    transition: 0.3s ease-out;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(5px);
  }
`;

const InputTextField = withStyles({
  root: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    width: "100%",
    boxShadow: "5px 8px 5px rgba(0,0,0,0.16)",

    "&:hover .MuiOutlinedInput-notchedOutline": {
      boxShadow: "5px 8px 10px rgba(0,0,0,0.3)",
      transition: "0.3s ease-in-out",
      border: "1px solid #ffffff",
    },

    "& .MuiFormLabel-root": {
      fontFamily: "Open Sans",
      fontWeight: 700,
      color: "black",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "10px",
        width: "100%",
        transition: "0.3s ease-in-out",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#111",
      },
      "& .MuiOutlinedInput-input": {
        fontFamily: "Open Sans",
        textAlign: "left",
        fontSize: "1.3vw",
        color: "#000000",
        fontWeight: "500",
      },
    },
  },
})(TextField);

const DisabledTextField = withStyles({
  root: {
    backgroundColor: "#d1d1d1",
    borderRadius: "10px",
    width: "100%",
    boxShadow: "5px 8px 5px rgba(0,0,0,0.16)",
    color: "#8f8f8f",

    "&:hover .MuiOutlinedInput-notchedOutline": {
      boxShadow: "5px 8px 10px rgba(0,0,0,0.3)",
      transition: "0.3s ease-in-out",
      border: "1px solid #ffffff",
    },

    "& .MuiFormLabel-root": {
      fontFamily: "Open Sans",
      fontWeight: 700,
      color: "black",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "10px",
        width: "100%",
        transition: "0.3s ease-in-out",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#111",
      },
      "& .MuiOutlinedInput-input": {
        fontFamily: "Open Sans",
        textAlign: "left",
        fontSize: "1.3vw",
        color: "#7a7a7a",
        fontWeight: "500",
      },
    },
  },
})(TextField);

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
