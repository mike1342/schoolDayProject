import React from "react";
import { View, FlatList, TextInput, Text, StyleSheet } from "react-native";

const fullSchedule = [
    ["1","2","3","4","5","6","7","8"],
    ["A","B","C","D","E","F"],
    ["M","S"]
];

var numIter = 0;
var alphaIter = 0;
var msIter = 0;

class ReminderView extends React.Component{

    constructor(props){
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.onChangeScheduleMode = this.onChangeScheduleMode.bind(this);
        this.onChangeDataList = this.onChangeDataList.bind(this);
        this.changeDataList = this.changeDataList.bind(this);

        this.state = {
            scheduleModeVal: this.props.settings.scheduleModeVal,
            dataList: this.props.settings.dataList,
        };

        this.dataList = this.state.dataList;

        this.unScheduleMode = this.props.settings.scheduleModeChanged.subscribe(this.onChangeScheduleMode);
        this.unDataList = this.props.settings.dataListChanged.subscribe(this.onChangeDataList);
    }

    componentWillUnmount(){
        this.unScheduleMode();
        this.unDataList();
    }

    onChangeDataList(newData){
        this.setState({dataList: newData});
    }

    onChangeScheduleMode(newVal){
        this.setState({scheduleModeVal: newVal});
    }

    changeDataList(keyPath1, keyPath2, newText, mode){
        var data = this.state.dataList;
        data[mode - 1][keyPath1][keyPath2] = newText;
        this.props.settings.onDataListChanged(data);
    }

    renderRow(row){
        var rowContent;
        if(this.state.scheduleModeVal == 1){ 
            var oldNumIter = numIter;
            var num = fullSchedule[0][numIter];
            var numString = num.toString();
            rowContent = 
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>{num}</Text>
                    <TextInput 
                        value={this.state.dataList[this.state.scheduleModeVal - 1][oldNumIter][numString]}
                        onChangeText={text => this.changeDataList(oldNumIter, numString, text, this.state.scheduleModeVal)}
                    />
                </View>
            ;

            if(numIter >= 7){
                numIter = 0;
            }
            else{
                numIter++;
            }
        }

        else if(this.state.scheduleModeVal == 2){
            var oldAlphaIter = alphaIter;
            var alpha = fullSchedule[1][alphaIter];
            var alphaString = alpha.toString();
            rowContent = 
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>{alpha}</Text>
                    <TextInput 
                        value={this.props.settings.dataList[this.state.scheduleModeVal - 1][oldAlphaIter][alphaString]}
                        onChangeText={text => this.changeDataList(oldAlphaIter, alphaString, text, this.state.scheduleModeVal)}
                    />
                </View>
            ;

            if(alphaIter >= 5){
                alphaIter = 0;
            }
            else{
                alphaIter++;
            }
        }

        else if(this.state.scheduleModeVal == 3){
            var oldmsIter = msIter;
            var ms = fullSchedule[2][msIter];
            var msString = ms.toString();
            rowContent = 
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>{ms}</Text>
                    <TextInput 
                        value = {this.props.settings.dataList[this.state.scheduleModeVal - 1][oldmsIter][msString]}
                        onChangeText={text => this.changeDataList(oldmsIter, msString, text, this.state.scheduleModeVal)}
                    />
                </View>
            ;

            if(msIter >= 1){
                msIter = 0;
            }
            else{
                msIter++;
            }
        }

        return rowContent;
    }

    render(){
        console.log(this.state.scheduleModeVal);

        return(
            
            <View style={styles.container}>
                <Text style={styles.headerText}>{this.props.settings.language.getText("SET_REMINDER")}</Text>
                <FlatList 
                    data={this.state.dataList[this.state.scheduleModeVal - 1]}
                    renderItem={this.renderRow}
                    extraData={this.state} //IT WORKS, BUT USE QUAGGLE TO FIGURE OUT TEXTINPUT 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 5,
    },
    rowTitle: {
        fontSize: 18,
    },
    headerText: {
        fontSize: 18,
        textDecorationLine: "underline",
    },
});

export default ReminderView;