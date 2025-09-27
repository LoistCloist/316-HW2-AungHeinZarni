import React from "react";

export default class EditToolbar extends React.Component {
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        console.log(event.key);
        if (event.ctrlKey && event.key === "z") {
            event.preventDefault();
            console.log('Ctrl+Z detected!');
            if (this.props.canUndo && this.props.undoCallback) {
                this.props.undoCallback();
            }
        }
        
        if (event.ctrlKey && event.key === "y") {
            event.preventDefault();
            console.log('Ctrl+Y detected!');
            if (this.props.canRedo && this.props.redoCallback) {
                this.props.redoCallback();
            }
        }
    }

    render() {
        const { canAddSong, canUndo, canRedo, canClose, 
                undoCallback, redoCallback, closeCallback, addSongCallback} = this.props;
        let addSongClass = "toolbar-button";
        let undoClass = "toolbar-button";
        let redoClass = "toolbar-button";
        let closeClass = "toolbar-button";
        if (!canAddSong) addSongClass += " card-button-disabled";
        if (!canUndo || !canClose) undoClass += " card-button-disabled";
        if (!canRedo) redoClass += " card-button-disabled";
        if (!canClose) closeClass += " card-button-disabled";

        return (
            <div id="edit-toolbar">
            <input 
                type="button" 
                id='add-song-button' 
                value="+" 
                className={addSongClass}
                onClick={addSongCallback}
            />
            <input 
                type="button" 
                id='undo-button' 
                value="⟲" 
                className={undoClass} 
                onClick={undoCallback}
            />
            <input 
                type="button" 
                id='redo-button' 
                value="⟳" 
                className={redoClass} 
                onClick={redoCallback}
            />
            <input 
                type="button" 
                id='close-button' 
                value="&#x2715;" 
                className={closeClass} 
                onClick={closeCallback}
            />
        </div>
        )
    }
}