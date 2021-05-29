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
    const [vidPath, setVidPath] = React.useState("");
    const [load, setLoad] = React.useState(false);

    const showVid = (path) => {
        setVidPath(path)
        setVid(true);
        console.log(vid)
    }

    const getResults = () => {
        axios.post('/getresults', {
            file: props.fileName
        }).then(re => {
            setLoad(true);
            setTimeout(() => {
                setLoad(false);
                console.log(re.data);
                showVid(re.data.output);
            }, 10000)
        }).catch(err => console.log(err));
    }
    if(load){
        return <div style={{zIndex: 230, position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, textAlign: 'center'}}><CircularProgress color="inherit" /></div>
    }
    if(vid){
        let path = "/videos/" + vidPath;
        
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
