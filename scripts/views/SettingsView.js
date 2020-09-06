import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Picker } from '@react-native-community/picker';

class SettingsView extends React.Component{

    constructor(props){
        super(props);
        this.changeLang = this.changeLang.bind(this);
        this.onChangeLang = this.onChangeLang.bind(this);
        this.onChangeSchedule = this.onChangeSchedule.bind(this);
        this.changeSchedule = this.changeSchedule.bind(this);

        this.state = {
            lang: this.props.settings.selectedLanguage,
            scheduleModeVal: this.props.settings.scheduleModeVal,
        };

        this.unLang = this.props.settings.languageChanged.subscribe(this.onChangeLang);
        this.unSchedule = this.props.settings.scheduleModeChanged.subscribe(this.onChangeSchedule);
    }

    componentWillUnmount(){
        this.unLang();
        this.unSchedule();
    }

    onChangeLang(y){
        this.setState({lang: y});
    }

    changeLang(langVal){
        this.props.settings.onLangChanged(langVal);
    }

    onChangeSchedule(newVal){
        this.setState({scheduleModeVal: newVal});
    }

    changeSchedule(newVal){
        this.props.settings.onScheduleModeChanged(newVal);
    }

    render(){
        var daysText = this.props.settings.language.getText("DAYS");
        var numLabel = daysText + " 1 - 8";
        var alphaLabel = daysText + " A - F";
        var msLabel = daysText + " M - S";


        return(
            <View style={styles.container}>
                <Picker
                    selectedValue={this.props.settings.language.selectedLanguage}
                    onValueChange={(itemValue, itemIndex) => this.changeLang(itemValue)}
                >
                    <Picker.Item label="English" value="English"/>
                    <Picker.Item label="Espanol" value="Spanish"/>
                </Picker>
                <Picker
                    selectedValue={this.state.scheduleModeVal}
                    onValueChange={(itemValue, itemIndex) => this.changeSchedule(itemValue)}
                >
                    <Picker.Item label={numLabel} value={1}/>
                    <Picker.Item label={alphaLabel} value={2}/>
                    <Picker.Item label={msLabel} value={3}/>
                </Picker>
                <View style={styles.creditView}>
                    <Text style={styles.creditText}>{this.props.settings.language.getText("CREATED_BY")} Michael Innocenzi</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    creditText: {
        fontSize: 16,
    },
    creditView: {
        justifyContent: "flex-end",
        alignContent: "flex-end",
    },
});

export default SettingsView;