class Event {
    constructor() {
        this.handlers = [];
    }
    subscribe(fn) {
        this.handlers.push(fn);
        var me = this;
        return function() {
            me.handlers = me.handlers.filter(function(v,i,a) {
                return v !== fn;
            });
        }
    }
    fire(obj) {
        var h = this.handlers;
        for(var i = 0; i < h.length; i++) {
            h[i](obj);
        };
    }

    fireTwoParams(obj1, obj2){
        var h = this.handlers;
        for(var i = 0; i < h.length; i++){
            h[i](obj1, obj2);
        };
    }

    fireNoArgs() {
        var h = this.handlers;
        for(var i = 0; i < h.length; i++){
            h[i];
        };
    }
}
export default Event;