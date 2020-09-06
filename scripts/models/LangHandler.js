class LanguageHandler{
    constructor(englishLanguage) {
        this.languages = {};
        this.names = [];
        this.languages["English"] = englishLanguage;
        this.defaultLanguage = englishLanguage;
        this.selectedLanguage = "English";

        this.names.push("English");
    }

    addLanguage(name, lang) {
        if(this.languages[name]){
            return console.error("ADDLANGUAGE FUNCTION ERROR");
        }

        this.languages[name] = lang;
        this.names.push(name);

        // make sure all keys in DEFAULTLANGUAGE are also in LANG
        for(key in this.defaultLanguage) {
            if(!lang.hasOwnProperty(key)){
                return console.error("KEY DOES NOT HAVE VALUE");
            }
        }
    }

    selectLanguage(name) {
        if(!this.languages[name]){
            return console.error("SELECTEDLANGUAGE FUNCTION ERROR");
        }
            this.selectedLanguage = name;
            return name;
    }

    getText(prefix) {
        return this.languages[this.selectedLanguage][prefix];
    }

    getSelectedLanguage() { return this.selectedLanguage; }
}

export default LanguageHandler;