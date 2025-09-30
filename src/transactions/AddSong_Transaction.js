import { jsTPS_Transaction } from "jstps";
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initApp) {
        super();
        this.app = initApp;
    }

    executeDo() {
        this.app.addSong();
    }
    
    executeUndo() {
        let lastIndex = this.app.state.currentList.songs.length - 1;
        this.app.deleteSong(lastIndex);
    }
}