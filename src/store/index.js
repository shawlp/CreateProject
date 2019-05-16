import TestStore from "./testStore";
import homeStore from './HomeStore';
import EnterParkStore from './EnterParkStore';
import LearnActStore from './LearnActStore';
import DiningStore from './DiningStore';
import NapStore from './NapStore';
import OutdoorActStore from './OutdoorActStore';
import LeaveParkStore from './LeaveParkStore'; 

class RootStore {
    constructor() {
        this.testStore = new TestStore();
        this.EnterParkStore = new EnterParkStore();
        this.homeStore = homeStore;
        this.LearnActStore = new LearnActStore();
        this.DiningStore = new DiningStore();
        this.NapStore = new NapStore();
        this.OutdoorActStore = new OutdoorActStore(); 
        this.LeaveParkStore = new LeaveParkStore();  
    }
} 
const rootStore = new RootStore(); 
export default rootStore;
