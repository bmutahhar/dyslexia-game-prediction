import React, { Component } from "react";
import Cards from "../../Components/Cards";


import lion from "../Images/Characters/lion.png";
import kangaroo from "../Images/Characters/kangaroo.png";
import bird from "../Images/Characters/eagle.png";
import image from "../../Components/Images/second.png";

import Background from "../../Components/Background";

import "../../Components/Cardstyle.css";


export default class level extends Component {
    render() {
        return <Levelselect />;
    }
}

const Levelselect = () => {


    return (
        <Background
            src={image}
            className="d-flex align-items-center justify-content-center flex-row"
            customStyle={false}
            id="about"
        >
            <Cards circles="circle" level="PRE-SCHOOL LEVEL" description="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 2-4"
                image={bird} />
            <Cards circles="circle1" level="LEARNER LEVEL" description="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 5-7"
                image={lion} />
            <Cards circles="circle2" level="ELEMENTARY LEVEL" description="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 7-10"
                image={kangaroo} />
        </Background>
    );
};
