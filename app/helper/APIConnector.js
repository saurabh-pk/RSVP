import constants from '../configs/constants';
export default class {
    static registerGuest(){
        return constants.BASE_URL + "/api/Guest/registerGuest";
    }
    static getGuestList(){
        return constants.BASE_URL + "/api/Guest/getGuestList";
    }
    static getAgeReportData(){
        return constants.BASE_URL + "/api/Guest/getAgeReportData";
    }
    static getLocalityReportData(){
        return constants.BASE_URL + "/api/Guest/getLocalityReportData";
    }
    static getOtherReportData(){
        return constants.BASE_URL + "/api/Guest/getOtherReportData";
    }
}