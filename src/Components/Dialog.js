import React from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageMapper from 'react-image-mapper';

import VideoPlayer from './VideoPlayer';

export default function FormDialog(props) {

    const [vid, setVid] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const showVid = () => {
        setVid(true);
        console.log(vid)
    }
    const getResults = () => {
        setLoad(true);
        axios.post('/getresults', {
            file: props.fileName
        }).then(re => {
            console.log(re.data);
            showVid();
        }).catch(err => console.log(err));
    }
    if(vid){
        let path = "/"+props.fileName;
        if(load){
            return <CircularProgress color="inherit" />
        }
        return (
            <div>
                <Dialog open={props.show} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth='lg' >
                    <DialogTitle id="form-dialog-title">Output</DialogTitle>
                    <DialogContent>
                        <VideoPlayer path={path} />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }else{
        return (
            <div>
                <Dialog open={props.show} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth='lg' >
                    <DialogTitle id="form-dialog-title">Configuration</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Select the points for the boxes.
                        </DialogContentText>
                        <ImageMapper src={props.url} width={900} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={getResults} color="primary">
                            Next
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
          );
    }
}
