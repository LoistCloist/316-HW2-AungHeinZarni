import React, { Component } from 'react';

export default class EditSongModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            artist: '',
            year: '',
            youTubeId: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.song !== this.props.song) {
            if (this.props.song) {
                this.setState({
                    title: this.props.song.title || '',
                    artist: this.props.song.artist || '',
                    year: this.props.song.year || '',
                    youTubeId: this.props.song.youTubeId || ''
                });
            } else {
                // Reset state when song is null (modal closed)
                this.setState({
                    title: '',
                    artist: '',
                    year: '',
                    youTubeId: ''
                });
            }
        }
    }

    handleInputChange = (field, value) => {
        this.setState({
            [field]: value
        });
    }

    handleConfirm = () => {
        const { editSongCallback } = this.props;
        const updatedSong = JSON.parse(JSON.stringify(this.props.song));
        updatedSong.title = this.state.title;
        updatedSong.artist = this.state.artist;
        updatedSong.year = this.state.year;
        updatedSong.youTubeId = this.state.youTubeId;
        this.props.editSongCallback(updatedSong);
    }

    render() {
        const { song, hideEditSongModalCallback } = this.props;
        
        if (!song) {
            return null;
        }

        return (
            <div id="edit-song-modal" className="modal" data-animation="slideInOutLeft">
                <div id='edit-song-root' className="modal-root">
                    <div id="edit-song-modal-header" className="modal-north">Edit Song</div>
                    <div id="edit-song-modal-content" className="modal-center">
                        <div id="title-prompt" className="modal-prompt">Title:</div>
                        <input id="edit-song-modal-title-textfield" 
                            className='modal-textfield' 
                            type="text" 
                            value={this.state.title}
                            onChange={(event) => this.handleInputChange('title', event.target.value)} />
                        <div id="artist-prompt" className="modal-prompt">Artist:</div>
                        <input id="edit-song-modal-artist-textfield" 
                            className='modal-textfield' 
                            type="text" 
                            value={this.state.artist}
                            onChange={(event) => this.handleInputChange('artist', event.target.value)} />
                        <div id="year-prompt" className="modal-prompt">Year:</div>
                        <input id="edit-song-modal-year-textfield" 
                            className='modal-textfield' 
                            type="text" 
                            value={this.state.year}
                            onChange={(event) => this.handleInputChange('year', event.target.value)} />
                        <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
                        <input id="edit-song-modal-youTubeId-textfield" 
                            className='modal-textfield' 
                            type="text" 
                            value={this.state.youTubeId}
                            onChange={(event) => this.handleInputChange('youTubeId', event.target.value)} />
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="edit-song-confirm-button" 
                            className="modal-button"
                            onClick={this.handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="edit-song-cancel-button" 
                            className="modal-button"
                            onClick={hideEditSongModalCallback} 
                            value='Cancel' />
                    </div>
                </div>
            </div>
        );
    }
}