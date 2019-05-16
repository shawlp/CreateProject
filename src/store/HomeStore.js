import {
    observable,
    action
} from 'mobx';

class HomeStore {
    @observable activePath = '/'

    @action activePathAction = (path) => {
        this.activePath = path
    }
}

const homeStore = new HomeStore()

export default homeStore;   