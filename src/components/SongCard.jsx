import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false,
            isHovered: false,
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
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
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }
    handleMouseEnter = (event) => {
        this.setState(prevState => ({
            isHovered: true
        }))
    }
    handleMouseLeave = (event) => {
        this.setState(prevState => ({
            isHovered: false
        }))
    }
    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        console.log("num: " + num);
        let itemClass = "song-card";
        if (this.state.draggedTo) {
            itemClass = "song-card-dragged-to";
        }
        if (this.state.isHovered) {
            itemClass += " song-card-hovered";
        }
        return (
            <div
                id={'song-card-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                draggable="true"
            >
                <a id={"song-card-title-" + num} className="song-card-title" href={"https://www.youtube.com/watch?v="+song.YtId}>{song.title}</a>
                <span id={"song-card-year-" + num} className="song-card-year"> ({song.year})</span>
                <span id={"song-card-by-" + num} className="song-card-by"> by </span>
                <span id={"song-card-artist-" + num} className="song-card-artist">{song.artist}</span>
                <button 
                    type="button"
                    id={"remove-song-button-" + num}
                    className="song-card-button"
                    draggable="false"
                >
                </button>
            </div>
        )
    }
}