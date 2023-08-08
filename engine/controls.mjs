export default {
    controls: {
        'Escape': [()=>{$('section#'+Micro.screens.active+' .escape').click();}]
    },
    init: function(){
        $(document).keydown((e)=>{
            for(let i in this.controls){
                if(e.key==i){
                    this.controls[i].forEach((e)=>e());
                }
            }
        })
    },
    registerControl: function(key, callback){
        this.controls[key] = this.controls[key]??[];
        this.controls[key].push(callback);
        let s = Symbol();
        callback.id = s;
        return s;
    },
    relinquishKey: function(key, s){
        if(!this.controls[key]) return;
        this.controls[key]=this.controls[key].filter((e)=>{e.id!=s});
    }
}