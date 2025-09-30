import SongCard from './SongCard.jsx';
import React from "react";

export default class SongCards extends React.Component {
    render() {
        const { currentList, 
                moveSongCallback,
                deleteSongCallback,
                editSongCallback,
                duplicateSongCallback } = this.props;
        if (currentList === null) {
            return (
                <div id="song-cards"></div>
            )
        }
        else {
            return (
                <div id="song-cards">
                    {
                        currentList.songs.map((song, index) => (
                            <SongCard
                                id={'song-' + (index+1)}
                                key={'song-' + (index+1)}
                                song={song}
                                songIndex={index}
                                moveCallback={moveSongCallback}
                                deleteSongCallback={deleteSongCallback}
                                editSongCallback={editSongCallback}
                                duplicateSongCallback={duplicateSongCallback}
                            />
                        ))
                    }
                </div>
            )
        }
    }
}