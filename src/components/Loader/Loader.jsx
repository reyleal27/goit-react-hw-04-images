import { Component } from "react";
import { FidgetSpinner } from "react-loader-spinner";

class Loader extends Component {
    render() {
        return (
            <FidgetSpinner
                visible={true}
                height="100"
                width="100"
                ariaLabel="fidget-spinner-loading"
                wrapperClass="fidget-spinner-wrapper"
                backgroundColor="#3144c3"
            />)
    }     
 
}
export default Loader;