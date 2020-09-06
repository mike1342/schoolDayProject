import { EnglishData, SpanishData } from "./LangData";
import LanguageHandler from "./LangHandler";
import Event from "./Event";
import { AsyncStorage } from "react-native";


class MainSettings{
    constructor(defaultLangVal, defaultScheduleModeVal, defaultScreenVal){
        this.language = new LanguageHandler(EnglishData);
        this.language.addLanguage("Spanish", SpanishData);
        this.dataList = [
            [{1: "FILLER"}, {2: "FILLER"}, {3: "FILLER"}, {4: "FILLER"}, {5: "FILLER"}, {6: "FILLER"}, {7: "FILLER"}, {8: "FILLER"}],
            [{A: "FILLER"}, {B: "FILLER"}, {C: "FILLER"}, {D: "FILLER"}, {E: "FILLER"}, {F: "FILLER"}],
            [{M: "FILLER"}, {S: "FILLER"}]  
        ];

        this.isScheduleValRetrieved = false;

        this.language.selectLanguage(defaultLangVal);

        this.languageVal = defaultLangVal;
        this.scheduleModeVal = defaultScheduleModeVal;
        this.screenVal = defaultScreenVal;

        this.languageChanged = new Event();
        this.scheduleModeChanged = new Event();
        this.dataListChanged = new Event();
        this.screenChanged = new Event();
        this.intialScheduleValRetrieved = new Event();
    }

    onDataListChanged(data){
        var ans = data;
        this.dataList = ans;
        this.dataListChanged.fire(ans);
        AsyncStorage.setItem("dataList", JSON.stringify(ans));
        return ans;
    }

    onLangChanged(val){
        var ans = this.language.selectLanguage(val);
        this.languageVal = ans;
        this.languageChanged.fire(ans);
        return ans;
    }

    onScheduleModeChanged(val){
        var ans = val;
        this.scheduleModeVal = ans;
        this.scheduleModeChanged.fire(ans);
        AsyncStorage.setItem("scheduleVal", JSON.stringify(ans));
        return ans;
    }

    onScreenChanged(val){
        var ans = val;
        this.screenVal = ans;
        this.screenChanged.fire(ans);
        return ans;
    }

    onIntialScheduleValRetrieved(bool){
        var ans = bool;
        this.isScheduleValRetrieved = ans;
        this.intialScheduleValRetrieved.fire(ans);
        return ans;
    }
}

export default MainSettings;