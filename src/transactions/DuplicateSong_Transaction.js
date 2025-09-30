import { jsTPS_Transaction } from "jstps";
/**
 * DuplicateSong_Transaction
 * 
 * This class represents a transaction that duplicates a song.
 * It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class DuplicateSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initSong, initOriginalIndex) {
        super();
        this.app = initApp;
        this.song = initSong;
        this.originalIndex = initOriginalIndex;
        this.duplicatedSong = null; // Will store the duplicated song
    }

    executeDo() {
        this.duplicatedSong = JSON.parse(JSON.stringify(this.song));
        this.duplicatedSong.title = this.song.title + " (Copy)";
        
        this.app.duplicateSong(this.song, this.originalIndex);
    }
    
    executeUndo() {
        let lastIndex = this.app.state.currentList.songs.length - 1;
        this.app.deleteSong(lastIndex);
    }
}