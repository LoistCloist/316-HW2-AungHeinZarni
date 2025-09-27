import { jsTPS_Transaction } from "jstps";
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
        constructor(initApp, initSongIndex, initOldSong, initNewSong) {
        super();
        this.app = initApp;
        this.songIndex = initSongIndex;
        this.oldSong = initOldSong;
        this.newSong = initNewSong;
    }

    executeDo() {
        this.app.editSongAtIndex(this.songIndex, this.newSong);
    }
    
    executeUndo() {
        // Edit the old song into the new song
        this.app.editSongAtIndex(this.songIndex, this.oldSong);
    }
}