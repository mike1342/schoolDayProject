import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import SchoolDayView from "./SchoolDayView";
import MainSettings from "../models/MainSettings";
import ReminderView from "./ReminderView";
import SettingsView from "./SettingsView";

const windowWidth = Dimensions.get('window').width;

class MainView extends React.Component{
    constructor(props){
        super(props);
        this.onChangeLang = this.onChangeLang.bind(this);
        this.onChangeScheduleMode = this.onChangeScheduleMode.bind(this);
        this.getData = this.getData.bind(this);
        this.getScheduleVal = this.getScheduleVal.bind(this);
        this.changeScreen = this.changeScreen.bind(this);
        this.onChangeScreen = this.onChangeScreen.bind(this);

        this.state = {
            languageVal: 0,
            scheduleModeVal: 1,
            screenVal: 1,
        };

        console.log(windowWidth / 3);

        this.state.settings = new MainSettings("English", 1, 1);

        this.unLang = this.state.settings.languageChanged.subscribe(this.onChangeLang);
        this.unScheduleMode = this.state.settings.languageChanged.subscribe(this.onChangeScheduleMode);
        this.unScreen = this.state.settings.screenChanged.subscribe(this.onChangeScreen);
    }

    componentDidMount(){
        this.getData();
        this.getScheduleVal();
    }

    componentWillUnmount(){
        this.unLang();
        this.unScheduleMode();
        this.unScreen();
    }

    onChangeLang(newLang){
        this.setState({languageVal: newLang});
    }

    onChangeScheduleMode(newVal){
        this.setState({scheduleModeVal: newVal});
    }

    async getData(){
        var data = await AsyncStorage.getItem("dataList");
        var newData = JSON.parse(data);
        if(newData == null){
            return;
        }
        else{
            this.state.settings.dataList = newData;
            this.state.settings.onDataListChanged(newData);
        }
    }

    async getScheduleVal(){
        var schedule = await AsyncStorage.getItem("scheduleVal");
        schedule = JSON.parse(schedule);
        if(schedule == null){
            return;
        }
        else{
            this.state.settings.scheduleModeVal = schedule;
            this.state.settings.onScheduleModeChanged(schedule);
        }
        this.state.settings.isScheduleValRetrieved = true;
        this.state.settings.onIntialScheduleValRetrieved(true);
        console.log("Initial Retrieved:" + schedule);
    }

    changeScreen(num){
        this.state.settings.onScreenChanged(num);
        console.log("changeScreen CALLED")
    }

    onChangeScreen(num){
        this.setState({screenVal: num});
    }

    render(){
        
        return(
            <View>
                <View style={{flexDirection: "row", borderBottomWidth: 1, width: windowWidth, flex: 1, justifyContent: 'space-evenly', backgroundColor: "black",}}>
                    <TouchableHighlight settings={styles.button}  onPress={() => this.changeScreen(1)}><Text style={{paddingTop: 35}} >Home</Text></TouchableHighlight>
                    <TouchableHighlight settings={styles.button}  onPress={() => this.changeScreen(2)}><Text style={{paddingTop: 35}} >Reminders</Text></TouchableHighlight>
                    <TouchableHighlight settings={styles.button}  onPress={() => this.changeScreen(3)}><Text style={{paddingTop: 35}} >Settings</Text></TouchableHighlight>
                </View>
                <View>
                    {this.state.screenVal == 1 ? 
                    <SchoolDayView settings={this.state.settings}/> : 
                    this.state.screenVal == 2 ? 
                    <ReminderView settings={this.state.settings}/> :
                    this.state.screenVal == 3 ?
                    <SettingsView settings={this.state.settings}/> :
                    null
                    }
                </View>
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
    button:{
        height: "100%",
        borderColor:"black",
        borderWidth: 2,
        flex: 1,
        backgroundColor: "blue",
    }
});

export default MainView;