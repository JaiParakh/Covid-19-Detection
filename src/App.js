import React from "react";
import { Cards } from "./Components";
import Dropzone from "react-dropzone";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";

class App extends React.Component {
  state = {
    data: {}
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  
  handleDrop(acceptedFiles){
    console.log("Yo")
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