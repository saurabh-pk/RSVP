import constants from '../configs/constants';
export default class {
    static registerGuest(){
        return constants.BASE_URL + "registerGuest";
    }
    static getGuestList(){
        return constants.BASE_URL + "getGuestList";
    }
    static getAgeReportData(){
        return constants.BASE_URL + "getAgeReportData";
    }
    static getLocalityReportData(){
        return constants.BASE_URL + "getLocalityReportData";
    }
    static getOtherReportData(){
        return constants.BASE_URL + "getOtherReportData";
    }
}