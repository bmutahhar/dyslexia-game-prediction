import React, { Component } from "react";

export default class Video extends Component {
  render() {
    return (
        <div className={this.props.className}
       style={{height:"100%", width:"100%"}}
       >

        <iframe
          title="instruction video"
          // src="https://www.youtube.com/embed/xhN5Zkm82DA"
          src="https://www.youtube.com/embed/Mboxf07U7XI"
          style={this.props.style}
        />
       </div>
      
        
      
    );
  }
}