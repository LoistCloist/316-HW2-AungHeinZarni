import React from "react";

export default class SidebarHeading extends React.Component {
    handleClick = (event) => {
        const { createNewListCallback, disabled } = this.props;
        if (!disabled) {
            createNewListCallback();
        }
    };
    render() {
        const { disabled } = this.props;
        return (
            <div id="sidebar-heading">
                <input 
                    type="button" 
                    id="add-list-button" 
                    className={`toolbar-button ${disabled ? 'disabled' : ''}`}
                    onClick={this.handleClick}
                    disabled={disabled}
                    value="+" />
                Your Playlists
            </div>
        );
    }
}