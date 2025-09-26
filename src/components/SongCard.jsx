import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false,
            editActive: false
        }
    }
    handleDragStart = (event) => {
        // Always use the main div's ID, not the child element's ID
        event.dataTransfer.setData("song", event.currentTarget);
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
        // Always use the main div's ID, not the child element's ID
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
        event.stopPropagation();
        this.props.deleteSongCallback(this.props.songKey)
    }
    getItemNum = () => {
        return this.props.id.substring("song-".length);
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
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                draggable="true"
            >
                <a id={"song-card-title-" + num} className="song-card-title" href={"https://www.youtube.com/watch?v="+song.youTubeId} draggable="false">{song.title}</a>
                <span id={"song-card-year-" + num} className="song-card-year" draggable="false"> ({song.year})</span>
                <span id={"song-card-by-" + num} className="song-card-by" draggable="false"> by </span>
                <span id={"song-card-artist-" + num} className="song-card-artist" draggable="false">{song.artist}</span>
                <button 
                    type="button"
                    id={"remove-song-button-" + num}
                    className="song-card-button"
                    draggable="false"
                    onClick={this.handleDeleteSong}
                >
                    XXX
                </button>
            </div>
        )
    }
}