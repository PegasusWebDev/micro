class Setting {
    _value;
    constructor(id, name, settings){
        this.name = name;
        this.default = settings.default;
        this.value = settings.default;
        this.category = settings.category;
        Micro.settings.data[id] = this;
        Micro.settings.category(this.category).contents.splice(settings.order??Micro.settings.category(this.category).contents.length-1, 0, this);
    }
    render(){}
    get value(){
        return this._value;
    }
    set value(val){
        this._value = val;
    }
}
class TextSetting extends Setting {
    constructor(id, name, settings){
        super(id, name, settings);
    }
    render(){}
    get value(){
        return this._value;
    }
    set value(val){
        this._value = val;
    }
}
class NumberSetting extends Setting {
    constructor(id, name, settings){
        super(id, name, settings);
    }
    render(){
        let self = this;
        let input = $(`<input type="number" value="${self.value}">`);
        $(input).change(()=>{self.value = $(input).val()});
        return input;
    }
    get value(){
        return this._value;
    }
    set value(val){
        this._value = Number(val)??0;
    }
}
class ToggleSetting extends Setting {
    constructor(id, name, settings){
        super(id, name, settings);
    }
    render(){}
    get value(){
        return this._value;
    }
    set value(val){
        this._value = !!val;
    }
}
class SettingsCategory {
    constructor(id, name, order){
        this.id = id;
        this.name = name;
        this.contents = [];
        Micro.settings.categories.splice(order??Micro.settings.categories.length-1, 0, this);
    }
}

export default {
    data: {},
    categories: [],
    category: function(id){
        return this.categories.filter((e)=>e.id==id)[0];
    },
    Setting,
    TextSetting,
    NumberSetting,
    ToggleSetting,
    SettingsCategory
}