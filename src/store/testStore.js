import { observable, action } from 'mobx';

export default class testStore {
    @observable text = 'Het exhibition project'

    @action change() {
        this.text = 'Het exhibition project ' + (+new Date());
    } 
} 
