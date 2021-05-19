import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import image from "../Images/backgrounds/profilebg.png";
import upload from "../Images/backgrounds/photo.svg";
import remove from "../Images/backgrounds/eraser.svg";
import edit from "../Images/backgrounds/pencil.svg";
import dp from "../Images/backgrounds/UploadIcon.svg";
import save from "../Images/backgrounds/save.png";

const ProfileTracking = () => {
  const [editinfo, setEditinfo] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [open, setOpen] = useState(false);
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
          console.log(ext);
          setFileType(ext);
          fetch(respJSON.data.pfp)
            .then((resp) => resp.blob())
            .then((blob) => {
              //   blob.type = ext;
              console.log(blob);
              setImgFile(blob);
              const url = URL.createObjectURL(blob);
              console.log(url);
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

  useEffect(() => console.log("File Type: ", fileType), [fileType]);

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
                <Icon iconimg={upload} />
                Upload
              </Span>
            </Selectimg>
            <Deleteimg onClick={deleteImage}>
              <Span>
                <Icon iconimg={remove} />
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
                    Edit <Icon iconimg={edit}></Icon>
                  </Span>
                ) : (
                  <Span onClick={onSave}>
                    Save <Icon iconimg={save}></Icon>
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
            <NavButton>Scoreboards</NavButton>
            <NavButton>Dyslexic Prediction</NavButton>
            <NavButton>Improvement Graph</NavButton>
          </ChartButton>
          <ChartGraphs></ChartGraphs>
        </ChartContainer>
      </GamePerformance>
    </Background>
  );
};

export default ProfileTracking;

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
  }

  &: focus {
    background-color: #19d14a;
    transition: 0.3s ease-in-out;
  }
`;
const ChartGraphs = styled.div`
  width: 80%;
  height: 90%;
  margin-right: 2vw;
  margin-left: 2vw;
  background-color: white;
  border-radius: 22px;
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
  ${"" /* margin: 25px 0px; */}
`;
const GamePerformance = styled.div`
  ${"" /* margin-top: 8vw; */}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100vh;
  ${"" /* margin:25px 0px; */}
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

const Icon = styled.div`
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
    color:"#8f8f8f",

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
