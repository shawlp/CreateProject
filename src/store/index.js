import EnterParkStore from './EnterParkStore';

class RootStore {
    constructor() {
        this.EnterParkStore = new EnterParkStore();
    }
} 
const rootStore = new RootStore(); 
export default rootStore;
