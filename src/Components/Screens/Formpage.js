import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInUp, zoomInDown, bounce, zoomIn } from "react-animations";
import { Dropdown } from "semantic-ui-react";
import bg from "../Images/bg.jpg";
import Character from "../Character";
import penguin1 from "../Images/Characters/penguin1.png";
import leapord from "../Images/Characters/leapord.png";
import polar from "../Images/Characters/polar.png";
import seal from "../Images/Characters/seal.png";
import penguin2 from "../Images/Characters/penguin2.png";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import "../Screens/Form.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import { HashLink as Link } from "react-router-hash-link";

export default class Form extends Component {
    render() {
        return <Formpage />;
    }
}


const Formpage = () => {
    const active = "30px";
    const nonactive = "20px";

    const [QA, setQA] = useState({
        q1: "",
        q1options: 0,
        q1opt1: "",
        q1opt2: "",
        q1opt3: "",
        q1opt4: "",
        q2: "",
        q2options: 0,
        q2opt1: "",
        q2opt2: "",
        q2opt3: "",
        q2opt4: "",
        q3: "",
        q3options: 0,
        q3opt1: "",
        q3opt2: "",
        q3opt3: "",
        q3opt4: "",
        q4: "",
        q4options: 0,
        q4opt1: "",
        q4opt2: "",
        q4opt3: "",
        q4opt4: "",
    });

    var q1arr = [QA.q1opt1, QA.q1opt2, QA.q1opt3, QA.q1opt4];
    var q2arr = [QA.q2opt1, QA.q2opt2, QA.q2opt3, QA.q2opt4];
    var q3arr = [QA.q3opt1, QA.q3opt2, QA.q3opt3, QA.q3opt4];
    var q4arr = [QA.q4opt1, QA.q4opt2, QA.q4opt3, QA.q4opt4];

    var menuitem1 = [];
    var menuitem2 = [];
    var menuitem3 = [];
    var menuitem4 = [];

    for (var i = 0; i < QA.q1options; i++) {
        menuitem1.push(<MenuItem value={q1arr[i]} style={styles.menuitem}>{q1arr[i]}</MenuItem>)
    }

    for (var i1 = 0; i1 < QA.q2options; i1++) {
        menuitem2.push(<MenuItem value={q2arr[i1]} style={styles.menuitem}>{q2arr[i1]}</MenuItem>)
    }

    for (var i2 = 0; i2 < QA.q3options; i2++) {
        menuitem3.push(<MenuItem value={q3arr[i2]} style={styles.menuitem}>{q3arr[i2]}</MenuItem>)
    }

    for (var i3 = 0; i3 < QA.q4options; i3++) {
        menuitem4.push(<MenuItem value={q4arr[i3]} style={styles.menuitem}>{q4arr[i3]}</MenuItem>)
    }

    const [runs, setRun] = useState(1);
    const [cvalues, setCvalues] = useState({
        c1: active,
        c2: nonactive,
        c3: nonactive,
        c4: nonactive,
        c5: nonactive,
        animal: penguin1,
    });

    var counter = runs;
    const Forwardnavigate = () => {
        if (runs < 5) {
            counter = counter + 1;

            setRun(counter);
        } else {
            setRun(counter);
        }

        navigation();
    };

    const Backwardnavigate = () => {
        if (runs > 1) {
            counter = counter - 1;
            setRun(counter);
        } else {
            setRun(counter);
        }
        navigation();
    };

    const navigation = () => {
        switch (counter) {
            default:
                break;

            case 1: {
                setCvalues({
                    c1: active,
                    c2: nonactive,
                    c3: nonactive,
                    c4: nonactive,
                    c5: nonactive,
                    animal: penguin1,
                });
                setQA({
                    q1: QandA.qna1.Q,
                    q1options: QandA.qna1.noofopt,
                    q1opt1: QandA.qna1.A1,
                    q1opt2: QandA.qna1.A2,
                    q1opt3: QandA.qna1.A3,
                    q1opt4: "",
                    q2: QandA.qna2.Q,
                    q2options: QandA.qna2.noofopt,
                    q2opt1: QandA.qna2.A1,
                    q2opt2: QandA.qna2.A2,
                    q2opt3: "",
                    q2opt4: "",
                    q3: QandA.qna3.Q,
                    q3options: QandA.qna3.noofopt,
                    q3opt1: QandA.qna3.A1,
                    q3opt2: QandA.qna3.A2,
                    q3opt3: QandA.qna3.A3,
                    q3opt4: "",
                    q4: QandA.qna4.Q,
                    q4options: QandA.qna4.noofopt,
                    q4opt1: QandA.qna4.A1,
                    q4opt2: QandA.qna4.A2,
                    q4opt3: "",
                    q4opt4: "",
                });

                break;
            }

            case 2: {
                setCvalues({
                    c1: nonactive,
                    c2: active,
                    c3: nonactive,
                    c4: nonactive,
                    c5: nonactive,
                    animal: leapord,
                });

                setQA({

                    q1: "",
                    q1options: 0,
                    q1opt1: "",
                    q1opt2: "",
                    q1opt3: "",
                    q1opt4: "",
                    q2: "",
                    q2options: 0,
                    q2opt1: "",
                    q2opt2: "",
                    q2opt3: "",
                    q2opt4: "",
                    q3: "",
                    q3options: 0,
                    q3opt1: "",
                    q3opt2: "",
                    q3opt3: "",
                    q3opt4: "",
                    q4: "",
                    q4options: 0,
                    q4opt1: "",
                    q4opt2: "",
                    q4opt3: "",
                    q4opt4: "",
                });

                break;
            }

            case 3: {
                setCvalues({
                    c1: nonactive,
                    c2: nonactive,
                    c3: active,
                    c4: nonactive,
                    c5: nonactive,
                    animal: polar,
                });

                break;
            }

            case 4: {
                setCvalues({
                    c1: nonactive,
                    c2: nonactive,
                    c3: nonactive,
                    c4: active,
                    c5: nonactive,
                    animal: seal,
                });

                break;
            }

            case 5: {
                setCvalues({
                    c1: nonactive,
                    c2: nonactive,
                    c3: nonactive,
                    c4: nonactive,
                    c5: active,
                    animal: penguin2,
                });

                break;
            }
        }
    };

    return (
        <Container className="container-fluid">
            <Row className="row" style={styles.bgCOLOR}>
                <Column className="col-11 m-auto" style={styles.coll_11}>
                    <Row className="row">
                        <Column className="col-12" style={styles.questions}>
                            <FormControl style={styles.formControl}>
                                <Question>{QA.q1}</Question>
                                <Select style={styles.select}>

                                    {menuitem1}

                                    {/* <MenuItem value="" style={styles.menuitem}><em>None</em></MenuItem>
                                    <MenuItem value="yes" style={styles.menuitem}>"yes"</MenuItem>
                                    <MenuItem value="no" style={styles.menuitem}>no</MenuItem>
                                    <MenuItem value="offcourse" style={styles.menuitem}>offcourse</MenuItem> */}
                                </Select>
                                <Question>{QA.q2}</Question>
                                <Select style={styles.select}>
                                    {menuitem2}
                                    {/* <MenuItem value="" style={styles.menuitem}><em>None</em></MenuItem>
                                    <MenuItem value="should this even be a question" style={styles.menuitem}>should this even be a question</MenuItem>
                                    <MenuItem value="yes a 100%" style={styles.menuitem}>yes a 100%</MenuItem> */}

                                </Select>
                                <Question>{QA.q3}</Question>
                                <Select style={styles.select}>

                                    {menuitem3}

                                    {/* <MenuItem value="" style={styles.menuitem}><em>None</em></MenuItem>
                                    <MenuItem value="alam" style={styles.menuitem}>alam</MenuItem>
                                    <MenuItem value="sher alam" style={styles.menuitem}>sher alam</MenuItem> */}

                                </Select>
                                <Question>{QA.q4}</Question>
                                <Select style={styles.select}>

                                    {menuitem4}
                                    {/* <MenuItem value="" style={styles.menuitem}><em>None</em></MenuItem>
                                    <MenuItem value="always" style={styles.menuitem}>always</MenuItem>
                                    <MenuItem value="i envy him" style={styles.menuitem}>i envy him</MenuItem> */}

                                </Select>
                            </FormControl>
                        </Column>
                    </Row>
                    <Row className="row">
                        <Column className="col-6" style={styles.cartoon}>
                            <Character
                                className="iceanimals"
                                src={cvalues.animal}
                                alt="iceanimals"
                                style={styles.iceanimals}
                            />
                        </Column>

                        <Column className="col-6" style={styles.navigation}>
                            {/* <h1>{QandA.qna1.noofopt}</h1> */}

                            <NavIcons>
                                <IoIosArrowBack
                                    onClick={Backwardnavigate}
                                    color="blue"
                                    size="55px"
                                    style={styles.navicon}
                                />
                                <BsCircleFill
                                    color="#0AC811"
                                    size={cvalues.c1}
                                    style={styles.circle}
                                />
                                <BsCircleFill
                                    color="#0A41F5"
                                    size={cvalues.c2}
                                    style={styles.circle}
                                />
                                <BsCircleFill
                                    color="#0BCECE"
                                    size={cvalues.c3}
                                    style={styles.circle}
                                />
                                <BsCircleFill
                                    color="#FF8000"
                                    size={cvalues.c4}
                                    style={styles.circle}
                                />
                                <BsCircleFill
                                    color="#EFF60F"
                                    size={cvalues.c5}
                                    style={styles.circle}
                                />
                                <IoIosArrowForward
                                    onClick={Forwardnavigate}
                                    color="blue"
                                    size="55px"
                                    style={styles.navicon}
                                />
                            </NavIcons>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Container>
    );
};

// const Select = styled.select`
// border: none;
// margin-top: 10px;
// width: 100%;
// height: 10%;

// `;

const NavIcons = styled.div`
  position: absolute;
  right: 2%;
  bottom: 10%;
`;

const Container = styled.div`
  height: 100vh;
`;

const Question = styled.h3`
margin-top: 12px;
`;
const Row = styled.div``;

const Column = styled.div``;

const styles = {
    bgCOLOR: {
        backgroundColor: "#21768d",
        height: "100vh",
    },

    coll_11: {
        backgroundImage: "url(" + bg + ")",
        height: "90vh",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: "20px",
        boxShadow: "5px 15px 8px rgba(0,0,0,0.4)",
    },

    questions: {
        textAlign: "left",
        height: "70vh",
        borderRadius: "20px 20px 0 0",
        // border: "3px solid red"
    },

    cartoon: {
        height: "20vh",
        borderRadius: "0 0 0 20px",
        // border: "3px solid blue",
    },

    navigation: {
        alignContent: "right",
        height: "20vh",
        borderRadius: "0 0 20px 0",
        // border: "3px solid green",
    },

    iceanimals: {
        position: "absolute",
        zIndex: 1,

        height: "110%",

        bottom: "-6%",
        left: "0.3%",
    },

    circle: {
        marginLeft: "3px",
        marginRight: "3px",
    },

    formControl: {
        marginLeft: "25px",
        marginRight: "5px",

        width: "95%",
        height: "70vh",
        borderRadius: "20px 20px 0 0",



    },

    select: {
        textAlign: "center",
        borderRadius: "5px",
        fontWeight: "bold",
        fontColor: "black",
        opacity: "0.8",
        // paddingLeft: "3px",
        // paddingRight: "3px",

        backgroundColor: "white",

        width: "100%",
        height: "13%",
        border: "1px solid black",

        '&:selectMenu': {
            backgroundColor: "blue",
        }

    },

    menuitem: {

        width: "100%",
        fontSize: "15px",
        fontWeight: "bold",
        fontColor: "black",



    },

    // navicon: {

    //     '&:hover': {
    //         cursor: "pointer"
    //     },

    // },
};

const QandA = {

    qna1: { Q: 'is mutahar noob?', A1: 'yes', A2: 'no', A3: 'OFFCOURSE', noofopt: 3, field: 'input' },
    qna2: { Q: 'is mutahar sexy?', A1: 'yes', A2: 'no', noofopt: 2, field: 'select' },
    qna3: { Q: 'is mutahar smart?', A1: 'yes', A2: 'is that a question', A3: 'OFFCOURSE', noofopt: 3, field: 'select' },
    qna4: { Q: 'is mutahar?', A1: 'yes he is', A2: 'no he is not', noofopt: 2, field: 'select' }
}