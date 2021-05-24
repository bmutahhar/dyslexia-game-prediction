import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress, Snackbar, Typography } from "@material-ui/core";
import { LocationOn, SentimentSatisfiedAltRounded } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import styled from "styled-components";
import { QuestionScore } from "../Components";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import StarRatings from "react-star-ratings";
import bg from "../Images/backgrounds/gamebg.png";
import larka from "../Images/characters/larka2.svg";
import larki from "../Images/characters/larki2.svg";

const ResultScreen = () => {
  const [scores, setScores] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]);
  const [viewport, setViewport] = useState({
    latitude: 30.3753,
    longitude: 69.3451,
    zoom: 10,
  });
  const [currentCoordinates, setCurrentCoordinates] = useState({
    longitude: null,
    latitude: null,
  });
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    message: "",
  });
  const [navigation, setNavigation] = useState(null);
  const [nearby, setNearby] = useState(null);
  const [nearbyPopup, setNearbyPopup] = useState(null);
  const [open, setOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentPositionPopup, setcurrentPositionPopup] = useState(false);
  const [message, setMessage] = useState(
    "Navigation not supported on this browser."
  );
  const time = useSelector((state) => state.time);
  const gender = useSelector((state) => state.gender);
  const currentLevel = useSelector((state) =>
    state.currentLevel.replace("/", "")
  );
  const history = useHistory();
  const mapboxApiToken = process.env.REACT_APP_MAPBOX_API_KEY;
  const size = 30;

  const handleClose = () => {
    setOpen(false);
  };

  const handleNearbyPopupClick = (index) => {
    if (nearbyPopup) {
      if (nearbyPopup[index]) {
        const tempArr = [...nearbyPopup];
        tempArr[index] = false;
        setNearbyPopup(tempArr);
      } else {
        const tempArr = Array(nearby.length).fill(false);
        tempArr[index] = true;
        setNearbyPopup(tempArr);
      }
      setcurrentPositionPopup(false);
    }
  };

  const handleNearbyMarkerClick = (el, i) => {
    setNearbyPopup(Array(nearby.length).fill(false));
    setViewport({
      ...viewport,
      longitude: el.geometry.coordinates[0],
      latitude: el.geometry.coordinates[1],
      transitionDuration: 3000,
      transitionInterpolator: new FlyToInterpolator(),
      zoom: 14,
    });
    setTimeout(() => handleNearbyPopupClick(i), 3000);
  };

  const fetchHospitals = (longitude, latitude) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?access_token=${mapboxApiToken}&proximity=${longitude},${latitude}&country=PK`;
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((respJSON) => {
        if (respJSON.features) {
          setTimeout(() => setNearby(respJSON.features), 5000);
          setNearbyPopup(Array(respJSON.features.length).fill(false));
        } else {
          setOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setNavigation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords);
          console.log("Latitude: ", position.coords.latitude);
          console.log("Longitude: ", position.coords.longitude);
          setViewport({
            ...viewport,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            transitionDuration: 5000,
            transitionInterpolator: new FlyToInterpolator(),
          });
          setCurrentCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchHospitals(position.coords.longitude, position.coords.latitude);
          setNavigation(true);
          setTimeout(() => setMapLoaded(true), 4500);
        },
        (err) => {
          console.log(err);
          setMessage(err.message);
          setNavigation(false);
        }
      );
    } else {
      setNavigation(false);
    }
  }, []);

  if (status.loading) {
    return (
      <Resultbg className="container-fluid" background={bg} loading>
          <CircularProgress
            style={{ color: "white", marginBottom: 40 }}
            size={150}
          />
          <Typography
            variant="h5"
            style={{
              color: "white",
            }}
          >
            Processing Diagnosis...
          </Typography>
      </Resultbg>
    );
  } else {
    return (
      <Resultbg className="container-fluid" background={bg}>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert severity="error" onClose={handleClose}>
            Could not load nearby hospitals, please try again!
          </Alert>
        </Snackbar>
        <Resultcards className="row">
          <Card>
            <TopBar className="row">
              <h4
                style={{
                  color: "white",
                  fontSize: "1.5vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "2px 5px",
                }}
              >
                Level: {titleCase(currentLevel)}
              </h4>
              <Time>{secondsToMinutes(time)}</Time>
            </TopBar>

            {scores.map((_, i) => {
              return <QuestionScore answer={1} index={i} key={i} />;
            })}
          </Card>
          <Card>
            <Heading className="row">
              <h3 style={{ fontSize: "1.6vw" }}>Dyslexic Prediction</h3>
            </Heading>
            <Prediction className="row">
              <h1 style={{ fontSize: "5vw", color: "#FF6161" }}>{95}%</h1>
              <img
                src={gender === "male" ? larka : larki}
                alt={gender === "male" ? "larka" : "larki"}
                style={{ height: "10vw", marginLeft: "3vw" }}
              />
            </Prediction>
            <Msg1 className="row">
              <p style={{ color: "#FF7F46" }}>
                Unfortunately your child has been diagnosed with Dyslexia with
                the prediction of 95%.
              </p>
            </Msg1>
            <Msg2 className="row">
              <p>
                We would recommend that you consider any of the nearest
                educational phycologist for your child. The phycologist will
                help your child in improving his condition
              </p>
            </Msg2>
            <NavButtons className="row">
              <PlayButton onClick={() => history.replace("/levelSelect")}>
                Play Again
              </PlayButton>
              <ExitButton onClick={() => history.replace("/")}>Exit</ExitButton>
            </NavButtons>
          </Card>
          <Card noPadding>
            <MapArea noMap={navigation === false ? 1 : 0}>
              {navigation === true ? (
                <ReactMapGL
                  {...viewport}
                  width="100%"
                  height="100%"
                  attributionControl={false}
                  onViewportChange={setViewport}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxApiAccessToken={mapboxApiToken}
                >
                  {mapLoaded && (
                    <Marker
                      longitude={currentCoordinates.longitude}
                      latitude={currentCoordinates.latitude}
                    >
                      <LocationOn
                        style={{
                          color: "#ab2016",
                          cursor: "pointer",
                        }}
                        size={30}
                        onClick={() => {
                          setcurrentPositionPopup(!currentPositionPopup);
                          setNearbyPopup(Array(nearby.length).fill(false));
                        }}
                      />
                    </Marker>
                  )}
                  {currentPositionPopup && (
                    <Popup
                      longitude={currentCoordinates.longitude}
                      latitude={currentCoordinates.latitude}
                      closeButton={false}
                      closeOnClick={true}
                      anchor="bottom"
                    >
                      <MarkerText>Current Location</MarkerText>
                    </Popup>
                  )}
                  {nearby &&
                    nearby.map((el, i) => {
                      return (
                        <div key={i}>
                          <Marker
                            longitude={el.geometry.coordinates[0]}
                            latitude={el.geometry.coordinates[1]}
                          >
                            <LocationOn
                              style={{
                                color: "#ab2016",
                                cursor: "pointer",
                              }}
                              size={30}
                              onClick={() => handleNearbyPopupClick(i)}
                            />
                          </Marker>
                          {nearbyPopup[i] && (
                            <Popup
                              longitude={el.geometry.coordinates[0]}
                              latitude={el.geometry.coordinates[1]}
                              closeButton={false}
                              closeOnClick={true}
                              anchor="bottom"
                            >
                              <Name marker>{el.text}</Name>
                              <Address marker>
                                {el.place_name.split(",").slice(1).join(",")}
                              </Address>
                            </Popup>
                          )}
                        </div>
                      );
                    })}
                </ReactMapGL>
              ) : (
                <Name>{message}</Name>
              )}
            </MapArea>
            <RecommendationArea loading={nearby ? 0 : 1}>
              {nearby
                ? nearby.map((el, i) => (
                    <RecommendationItem
                      key={i}
                      onClick={() => handleNearbyMarkerClick(el, i)}
                    >
                      <Name>{el.text}</Name>
                      <Address>
                        {el.place_name.split(",").slice(1).join(",")}
                      </Address>
                      <StarRatings
                        rating={4.5}
                        starRatedColor="yellow"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                        starSpacing="2px"
                      />
                    </RecommendationItem>
                  ))
                : viewport.latitude &&
                  viewport.longitude &&
                  navigation && (
                    <CircularProgress size={30} style={{ color: "white" }} />
                  )}
            </RecommendationArea>
          </Card>
        </Resultcards>
      </Resultbg>
    );
  }
};

export default ResultScreen;

const PlayButton = styled.button`
  border-radius: 7px;
  border: none;
  color: white;
  background-color: #3fcb6e;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 40%;
  height: 50%;
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
  border: none;
  color: white;
  background-color: #cb3f3f;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 40%;
  height: 50%;
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
const Heading = styled.div`
  margin-top: 1vw;
  display: flex;
  height: 10%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Prediction = styled.div`
  display: flex;
  flex-direction: row;
  height: 40%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Msg1 = styled.div`
  display: flex;
  margin-bottom: 1vw;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 100%;
`;

const Msg2 = styled.div`
  display: flex;
  margin-bottom: 1vw;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 20%;
  width: 100%;
`;

const NavButtons = styled.div`
  align-items: center;
  justify-content: space-around;
  height: 20%;
  width: 100%;
`;

const Time = styled.time`
  color: #ffffff;
  font-size: 1.6vw;
  margin: 2px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Profileimg = styled.div`
  background-color: red;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;
const Resultbg = styled.div`
  background-image: url(${({ background }) => background});
  height: 100vh;
  width: 100%;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  ${({ loading }) =>
    loading
      ? `display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;`
      : ""}
  display:flex;
  align-items: center;
  justify-content: center;
`;
const Resultcards = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

const Card = styled.div`
  ${({ noPadding }) => {
    return noPadding
      ? ""
      : `padding-left: 1vw;
  padding-right: 1vw;
  padding-bottom: 1vw;`;
  }}
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  width: 30%;
  background-image: linear-gradient(to bottom, #388258, #0e0e13);
  color: white;
  border: 6px solid #5bc45f;
  border-radius: 10px;
`;

const MapArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
  width: 100%;
  ${({ noMap }) => (noMap ? "text-align:center;" : "")}
`;

const RecommendationArea = styled.div`
  display: flex;
  ${({ loading }) =>
    loading
      ? "justify-content:center; align-items: center;"
      : "align-items: flex-start;"}
  flex-direction: column;
  height: 40%;
  width: 100%;
  overflow-y: scroll;
`;

const RecommendationItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  padding-top: 2px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 2px;
  cursor: pointer;
`;

const Name = styled.h4`
  margin: 0px;
  ${({ marker }) => (marker ? "font-size:1.2vw;" : "font-size:1.5vw;")}
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  ${({ marker }) => (marker ? "color:black;" : "color: white;")}
`;
const Address = styled.span`
  ${({ marker }) => (marker ? "color:black;" : "color: #eee;")}
  font-size: 1vw;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
`;
const MarkerText = styled.div`
  color: #000;
  font-size: 1vw;
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
`;

function titleCase(str) {
  if (str !== "") {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  } else return str;
}

const secondsToMinutes = (seconds) => {
  const min = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const time = `${min > 9 ? min : `0${min}`}:${secs > 9 ? secs : `0${secs}`}`;
  return time;
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
