import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false,
            editActive: false,
            text: this.props.song.title
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.currentTarget.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnd = (event) => {
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.currentTarget;
        let targetId = target.id;
        targetId = targetId.substring(targetId.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }
    handleDeleteSong = (event) => {
        console.log("handleDeleteSong", this.props.song.youTubeId);
        event.stopPropagation();
        this.props.deleteSongCallback(this.props.songIndex)
    }
    handleClick = (event) => {
        event.stopPropagation();
        this.handleToggleEdit(event);
        console.log("THisis happening")
    }
    handleToggleEdit = (event) => {
        event.stopPropagation();
        this.setState(prevState => ({
            editActive: !prevState.editActive
        }));
        this.props.editSongCallback(this.props.song, this.props.songIndex);
    }
    handleBlur = () => {
        let song = this.props.song;
        let textValue = this.state.text;
        console.log("songCard handleBlur: " + textValue);
        this.props.editSongCallback(song, this.props.songIndex);
        this.handleToggleEdit();
    }
    handleKeyPress = (event) => {
        if (event.code === "Enter") {
            this.handleBlur();
        }
    }
    getItemNum = () => {
        return this.props.id.substring("song-".length);
    }
    handleDuplicateSong = (event) => {
        event.stopPropagation();
        let song = this.props.song;
        this.props.duplicateSongCallback(song, this.props.songIndex);
    }
    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        let itemClass = "song-card";
        if (this.state.draggedTo) {
            itemClass = "song-card-dragged-to";
        }
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                draggable="true"
                onClick={this.handleClick}
                onKeyUp={this.handleKeyPress}
            >
                <a id={"song-card-title-" + num} className="song-card-title" href={"https://www.youtube.com/watch?v="+song.youTubeId} draggable="false">{song.title}&nbsp;</a>
                <span id={"song-card-year-" + num} className="song-card-year" draggable="false">({song.year})&nbsp;</span>
                <span id={"song-card-by-" + num} className="song-card-by" draggable="false">by&nbsp;</span>
                <span id={"song-card-artist-" + num} className="song-card-artist" draggable="false">{song.artist}</span>

                <div className="song-card-buttons">
                    <input type="button"
                        id={"remove-song-button-" + num}
                        className="card-button"
                        draggable="false"
                        onClick={this.handleDeleteSong}
                        value={"X"}
                    />
                    <input id={"duplicate-song-button-" + num} 
                            type="button" 
                            className="card-button"
                            onClick={this.handleDuplicateSong}
                            value="⎘" />
                </div>
            </div>
        )
    }
}