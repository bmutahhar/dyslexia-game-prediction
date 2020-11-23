import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Login extends Component {
    render() {
        return (
            <div className="container" style={styles.login}>
                Login Page will be displayed here
                <Link to="/" >
                    <button className="btn btn-outline-sucess btn-success align-self-center">Take me to home</button>
                </Link>
            </div>
        )
    }
}

const styles = {
    login:{
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: '#bbb',
        minWidth:"100%",
        minHeight:"100vh",
        fontWeight:700,
        fontFamily:"Montserrat",
        fontSize:"48px",
        border: "2px solid black"
    }
}
