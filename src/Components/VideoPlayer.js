import React from 'react';
import ReactPlayer from 'react-player';

export default class VideoPlayer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={{textAlign: 'center'}}>
                <ReactPlayer url={this.props.path} controls={true} />
            </div>
        )
    }
}