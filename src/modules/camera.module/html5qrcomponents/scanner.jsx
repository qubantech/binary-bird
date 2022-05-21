import './app.css';
import React from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin'
import { useNavigate } from "react-router-dom";
import {Text, Title} from "@mantine/core";

class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false
        }

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

    render() {
        console.log(this.props)
        return (
            <div className="App">
                <section className="App-section">
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={300}
                        disableFlip={false}
                        qrCodeSuccessCallback={this.onNewScanResult}/>
                    <Text align={'center'} mx={15} color={"black"}>Отсканируйте QR-код покупателя для идентификации клиента</Text>
                    {/*<ResultContainerPlugin results={this.state.decodedResults} />*/}
                </section>
            </div>
        );
    }

    onNewScanResult(decodedText, decodedResult) {
        console.log(
            "App [result]", decodedText, decodedResult);
        console.log(decodedResult.result.format.formatName)
        console.log(decodedText)
        // if (decodedResult.result.format.format === 9 || decodedResult.result.format.format === 10) {
        //     console.log(
        //         "App barcode[result]", decodedText, decodedResult);
        //     this.props.history(`/barcode/${decodedText}`);
        // }
        if (decodedResult.result.format.format === 0) {
            this.state.isError = true;
            console.log(this.state.isError)
            console.log(
                "App qr[result]", decodedText, decodedResult);
            this.props.setUid(decodedText)
            this.props.setOpen(false)
            //this.props.history(`/qrcode/${btoa(decodedText)}`);
        }
        else {
            this.state.isError = true;
            console.log("Incorrect code");
        }
    }
}

export default (props) => (
    <Scanner setOpen={props.setOpen} setUid={props.setUid} />
);
