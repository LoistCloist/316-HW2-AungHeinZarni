import { jsTPS_Transaction } from "jstps";
/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initSongIndex) {
        super();
        this.app = initApp;
        this.songIndex = initSongIndex;
        this.deletedSong = null; // Will store the song being deleted
    }

    executeDo() {
        // Store the song before deleting it
        this.deletedSong = JSON.parse(JSON.stringify(this.app.state.currentList.songs[this.songIndex]));
        this.app.deleteSong(this.songIndex);
    }
    
    executeUndo() {
        // First add the song back to the end
        this.app.addSong();
        // Then edit it to match the original deleted song
        let lastIndex = this.app.state.currentList.songs.length - 1;
        this.app.editSongAtIndex(lastIndex, this.deletedSong);
    }
}