import React, { Component } from 'react';

export default class EditSongModal extends Component {
    render() {
        const { song, editListCallback, hideEditSongModalCallback } = this.props;
        return (
            <div id="edit-song-modal" class="modal" data-animation="slideInOutLeft">
                <div id='edit-song-root' class="modal-root">
                    <div id="edit-song-modal-header" class="modal-north">Edit Song</div>
                    <div id="edit-song-modal-content" class="modal-center">
                        <div id="title-prompt" class="modal-prompt">Title:</div><input id="edit-song-modal-title-textfield" class='modal-textfield' type="text" value={song.name} />
                        <div id="artist-prompt" class="modal-prompt">Artist:</div><input id="edit-song-modal-artist-textfield" class='modal-textfield' type="text" value={song.artist} />
                        <div id="year-prompt" class="modal-prompt">Year:</div><input id="edit-song-modal-year-textfield" class='modal-textfield' type="text" value={song.year} />
                        <div id="you-tube-id-prompt" class="modal-prompt">You Tube Id:</div><input id="edit-song-modal-youTubeId-textfield" class='modal-textfield' type="text" value={song.youtubeId} />
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="edit-song-confirm-button" 
                            class="modal-button"
                            onClick={editListCallback}
                            value='Confirm' />
                        <input type="button" 
                            id="edit-song-cancel-button" 
                            class="modal-button"
                            onClick={hideEditSongModalCallback} 
                            value='Cancel' />
                    </div>
                </div>
            </div>
        );
    }
}