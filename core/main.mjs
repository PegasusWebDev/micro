const events = {
    load: (self)=>{
        console.log('Vanilla Micro got loaded');
        new Micro.settings.SettingsCategory('debug', 'Debug Settings');
        new Micro.settings.NumberSetting('imaginary', 'Imagine a setting here', {
            default: 1,
            category: 'debug'
        });
        new Micro.settings.TextSetting('nothing', 'This definitely does something', {
            default: 'default',
            category: 'debug'
        });
        new Micro.settings.ToggleSetting('settings', 'Cooler settings', {
            default: false,
            category: 'debug'
        });
        new Micro.settings.EnumSetting('wip', 'WIP setting', {
            default: 'One',
            category: 'debug',
            options: ['One', 'Two', 'Three']
        })
    },
    buildscreen: (name)=>{
        if(name=="globalsettings"){
            console.dir(Micro.settings.categories);
            $('#globalsettings .settings').empty();
            for(let i in Micro.settings.categories){
                $('#globalsettings .settings').append("<h2>"+Micro.settings.categories[i].name+"</h2>");
                let t = $('<table></table>');
                for(let j in Micro.settings.categories[i].contents){
                    let setting = Micro.settings.categories[i].contents[j];
                    $(t).append($('<tr><td>'+setting.name+'&nbsp;&nbsp;</td></tr>').append($('<td></td>').append(setting.render())));
                }
                $('#globalsettings .settings').append(t);
            }
        }
    }
}
export {events}