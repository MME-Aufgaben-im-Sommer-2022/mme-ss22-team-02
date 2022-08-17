import {Observable} from "./utils/Observable";

export class Community extends Observable {
    _id;
    _loaded = false;


    constructor(id) {
        super();
        this._id = id;
    }

    getId() {
        return this._id;
    }

    isLoaded() {
        return this._loaded;
    }

    async loadBaseData() {

        await new Promise(resolve => setTimeout(resolve, 1000));

        this._loaded = true;

        this.emit("loaded");
    }

    getCommunityID() {

    }
    getMemberList() {

    }
    getMemberCounter() {

    }
    viewMemberDetails() {

    }
    openChat() {

    }





    //requests
    displayOpenRequests() {

    }
    addNewRequest() {

    }
    acceptRequest() {

    }
    viewMyRequests() {

    }
    viewAcceptedRequests() {

    }




    //suchoptionen

    showAllFilters() {

    }
    addFilter() {

    }
    searchByAttribute(...attribute) {

    }











}
