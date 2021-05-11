import React from "react";
import { Cards } from "./Components";
import Dropzone from "react-dropzone";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";
import axios from "axios";
import Dialog from './Components/Dialog';
import ls from 'local-storage'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      fileName: "",
      visible: true,
      open: false,
      showImg: false,
      imgPath: ""
    };
  }
  
  async componentDidMount() {
    ls.remove('file');
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  
  handleDrop = async (acceptedFiles) => {
    let file = acceptedFiles[0];
    console.log(file)
    let res = await axios.post('/uploadvideo', {
      fileName: file.name
    });
	  //console.log(file);
    console.log(res);
    this.setState({visible: true, fileName: file.name, open: true, imgPath: res.data.imgPath});
    setTimeout(() => {
      this.setState({open: false, showImg: true});
    }, 3000);
    console.log(this.state);
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleDialogClose = () => {
    this.setState({showImg: false})
  }

  handleDialogSubmit = () => {
    this.setState({showImg: false})
  }
/*
  handleToggle = () => {
    let open = !this.state.open;
    this.setState({open});
  }*/
  
  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <br />
        <Cards data={data} />
        <br />
        <h2>Upload a video here for analysing social distancing protocols</h2>
        <br />
        <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: styles.dropzone })}>
            <input {...getInputProps()} />
            <p>Upload your video here</p>
          </div>
        )}
      </Dropzone>
      <Backdrop open={this.state.open} onClick={this.handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog fileName={this.state.fileName} url={this.state.imgPath} show={this.state.showImg} handleSubmit={this.handleDialogSubmit} />
      <br />
      </div>
    );
  }
}

export default App;