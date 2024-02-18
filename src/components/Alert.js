import { Component } from 'react';

class Alert extends Component {
    // will render text that it wll receive from props
    constructor(props) {
        super(props);
        // null as the subclasses will overwrite them 
        this.color = null;
        this.bgColor = null;
    }

    getStyle = () => {   // defines basic styles
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            borderWidth: "2px",
            borderStyle: "solid",
            fontWeight: "bolder",
            borderRadius: "7px",
            borderColor: this.color,
            textAlign: "center",
            fontSize: "12px",
            margin: "10px 0",
            padding: "10px"
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}
class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#13bf7a'; // text
        this.bgColor = '#cce8dd'; // background 
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#e60000'; // text
        this.bgColor = '#ffcccc'; // background 
    }
}
class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = ' #0000ff'; // text
        this.bgColor = '#b3b3ff'; // background 
    }
}
export { InfoAlert, ErrorAlert, WarningAlert };