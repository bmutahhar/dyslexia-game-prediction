import React, { Component } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import "../style/Home.css"

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="bg-custom"></div>
                {/* <img src={require("../Assets/Images/Group 2.png")} className="bg-custom" alt=""/> */}
            </div>
        )
    }
}
