import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, ActivityIndicator } from 'react-native';
import { AdMobBanner } from "expo-ads-admob";
import firebase from "../models/firebaseInit";

const fullSchedule = [
    ["1","2","3","4","5","6","7","8"],
    ["A","B","C","D","E","F"],
    ["M","S"]
];

class SchoolDayView extends React.Component{

    constructor(props){
        super(props);
        this.onDayChange = this.onDayChange.bind(this);
        this.getTodayDateKey = this.getTodayDateKey.bind(this);
        this.getTomorrowDateKey = this.getTomorrowDateKey.bind(this);
        this.onChangeScheduleMode = this.onChangeScheduleMode.bind(this);
        this.onChangeDataList = this.onChangeDataList.bind(this);
        this.onChangeInitalScheduleVal = this.onChangeInitalScheduleVal.bind(this);
        this.retrieveDayVal = this.retrieveDayVal.bind(this);

        this.state = {
            yearKey: this.getTodayDateKey(),
            dayVal: 1,
            scheduleModeVal: this.props.settings.scheduleModeVal,
            dataList: this.props.settings.dataList,
            isLoading: true,
            isInitalScheduleValRetrieved: this.props.settings.isScheduleValRetrieved,
        };

        this.unDataList = this.props.settings.dataListChanged.subscribe(this.onChangeDataList);
        this.unScheduleMode = this.props.settings.scheduleModeChanged.subscribe(this.onChangeScheduleMode);
        this.unIntialScheduleMode1 = this.props.settings.intialScheduleValRetrieved.subscribe(this.onChangeInitalScheduleVal);
        this.unIntialScheduleMode2 = this.props.settings.intialScheduleValRetrieved.subscribe(this.retrieveDayVal);
    }

    componentDidMount(){
        if(!this.state.isInitalScheduleValRetrieved){
            return;
        }
        else{
            this.retrieveDayVal();
        }
    }

    componentWillUnmount(){
        this.unScheduleMode();
        this.unDataList();
        this.unIntialScheduleMode1();
        this.unIntialScheduleMode2();
    }

    retrieveDayVal(){
        var rootRef = firebase.database().ref(this.state.scheduleModeVal.toString() + "/" + this.state.yearKey[0] + "/" + this.getTodayDateKey());
        rootRef.once("value").then(snapshot => {
            var dayVal = snapshot.val();
            this.setState({dayVal: dayVal, isLoading: false, yearKey: this.getTodayDateKey()});
            console.log("DAYVAL RECIEVED: " + dayVal);
        });
        console.log("COMPONENTDIDMOUNT CALLED");
    }

    onChangeScheduleMode(newVal){
        this.setState({scheduleModeVal: newVal});
        console.log("Schedule Mode setState: " + newVal);
    }

    onChangeDataList(newData){
        this.setState({dataList: newData});
    }

    onChangeInitalScheduleVal(bool){
        this.setState({isInitalScheduleValRetrieved: bool});
    }

    getTomorrowDateKey(){
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        var date = currentDate.getDate(); 
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var yearLastDigit = year % 10;
        var yearFirstDigit = (year / 10) % 10;
        var yearKey = month.toString() + "-" + date.toString() + "-" + yearFirstDigit.toString() + yearLastDigit.toString();
        return yearKey;
    }

    getTodayDateKey(){
        var date = new Date().getDate(); 
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var yearLastDigit = year % 10;
        var yearFirstDigit = (year / 10) % 10;
        var yearKey = month.toString() + "-" + date.toString() + "-" + yearFirstDigit.toString() + yearLastDigit.toString();
        return yearKey;
    }

    onDayChange(bool){
        var yearKey;
        if(bool){
            yearKey = this.getTodayDateKey();
        }
        else{
            yearKey = this.getTomorrowDateKey();
        }
        this.setState({yearKey: yearKey});
        firebase.database().ref(this.state.scheduleModeVal.toString() + "/" + yearKey[0] + "/" + yearKey).once("value").then((snapshot) => {
            var dayVal = snapshot.val();
            this.setState({dayVal: dayVal});
        });
    }

    render(){
        var showDayVal;
        var isReminderVisible;
        var isLoadingVisible;
        //console.log(this.state.dataList);
        console.log("SCHOOLDAY SCHEDULE" + this.state.scheduleModeVal);
        console.log(this.state.dayVal.toString());
        console.log(this.state.dataList[this.state.scheduleModeVal - 1][fullSchedule[this.state.scheduleModeVal - 1].indexOf(this.state.dayVal.toString())]);
        if(this.state.dayVal.length >= 2 || this.state.dayVal.length == 0){
            console.log("Reminder should be false");
            showDayVal = this.props.settings.language.getText("NO_SCHOOL_TODAY");
            isReminderVisible = false;
        }
        else {
            showDayVal = this.props.settings.language.getText("DAY") + " " + this.state.dayVal.toString();
            isReminderVisible = true;
        }

        if(!this.state.isLoading && this.state.isInitalScheduleValRetrieved){
            isLoadingVisible = false;
        }
        else{
            isLoadingVisible = true;
        }

        return(
            
            <View style={{flexDirection: "column", width: "100%", height: "100%", justifyContent: "space-between"}}>
                <View></View>
                {isLoadingVisible == false ?
                    <View>
                        <View>
                            <Text style={styles.dayText}>{showDayVal}</Text>
                            {isReminderVisible ? <Text style={styles.reminderText}>{this.state.dataList[this.state.scheduleModeVal - 1][fullSchedule[this.state.scheduleModeVal - 1].indexOf(this.state.dayVal.toString())][this.state.dayVal.toString()]}</Text> : null}
                        </View>
                        <View>
                            <View style={styles.buttonRow}>
                                <TouchableHighlight style={styles.button} onPress={() => this.onDayChange(true)} underlayColor={"#d44c5d"}>
                                    <Text style={styles.buttonText}>{this.props.settings.language.getText("TODAY")}</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.button} onPress={() => this.onDayChange(false)} underlayColor={"#d44c5d"}>
                                    <Text style={styles.buttonText}>{this.props.settings.language.getText("TOMORROW")}</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{justifyContent: "center", paddingBottom: 100, paddingTop: 10}}>
                                <TouchableHighlight style={styles.refreshButton} onPress={() => this.onDayChange(true)} underlayColor={"#d44c5d"}>
                                    <Text style={styles.buttonText}>{this.props.settings.language.getText("REFRESH")}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View> :
                    <ActivityIndicator size="large" color="#ffffff"/>
                }
                
                <View>
                    <AdMobBanner 
                        bannerSize={"smartBannerPortrait"}
                        adUnitID={"ca-app-pub-3940256099942544/6300978111"}
                        testDeviceID={"EMULATOR"}
                    />    
                </View>  
            </View>
            
        );
        
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#EE596C",
        borderRadius: 100,
        borderColor: "#EE596C",
        borderWidth: 1,
        height: 40,
        width: Dimensions.get("window").width * 0.4,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    refreshButton: {
        backgroundColor: "#EE596C",
        borderColor: "#EE596C",
        borderWidth: 1,
        height: 40,
        width: Dimensions.get("window").width * 0.8,
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonRow:{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 40,
    },
    dayText: {
        fontSize: 40,
        color: "#433D3F",
        fontWeight: "800",
        marginTop: 50,
        textAlign: "center",
        fontWeight: "bold",
    },
    reminderText: {
        fontSize: 40,
        color: "#433D3F",
        fontWeight: "800",
        marginTop: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    buttonText:{
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    }
});

export default SchoolDayView;