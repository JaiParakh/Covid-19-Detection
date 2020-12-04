import React from "react";
import { Cards } from "./Components";
import Dropzone from "react-dropzone";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";
import axios from "axios";

class App extends React.Component {
  state = {
    data: {}
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  
  async handleDrop(acceptedFiles){
    let file = acceptedFiles[0];
    const data = new FormData()
    data.append('file', file)
    let res = await axios.post('/getresult', data);
	  //console.log(file);
    console.log(res);
    alert("You are Covid "+ res.data.covid);
  }
  
  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <br />
        <Cards data={data} />
        <br />
        <h2>Upload you X-Ray below for a free Covid-19 Test</h2>
        <br />
        <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: styles.dropzone })}>
            <input {...getInputProps()} />
            <p>Upload you X-Ray here</p>
          </div>
        )}
      </Dropzone>
      </div>
    );
  }
}

export default App;