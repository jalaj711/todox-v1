import React from 'react';
import { withStyles } from "@material-ui/core/styles"
import { div } from "@material-ui/core"

class IndexPage extends React.Component {
    render(){
        return(
            <div className={this.props.classes.root}>
                <div className={this.props.classes.imageHolder}>
                    <img src="./icons/512x512.png" alt="" />
                </div>
            </div>
        )
    }
}

export default withStyles((theme) => ({
    root: {
        display: "block",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#fff"
    },
    imageHolder: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}))(IndexPage)