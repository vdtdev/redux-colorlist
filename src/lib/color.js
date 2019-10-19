class Color {
    constructor(name, value){
        this.name = name;
        // if(Array.isArray(value)){
        //     let [r,g,b] = value;
        //     this.channels = {r, g, b};
        // } else if(typeof value == 'object'){
        //     let {r,g,b} = {r: 0, g: 0, b: 0, ...value};
        //     this.channels = {r, g, b};
        // } else if(typeof value == 'string'){
        //     this.channels = Color.hexToObj(value);
        // }
        this.channels = Color.valToChannels(value);
    }
    
    get colorCode(){
        return Color.objToHex(this.channels);
    }

    set colorCode(code){
        this.channels = Color.hexToObj(code);
    }

    get colorChannels(){
        return this.channels;
    }

    set colorChannels(newChannels){
        this.channels = { r: 0, g: 0, b: 0, ...this.channels, ...newChannels};
    }

    clone(){
        return new Color(this.name, this.colorChannels);
    }

    static hexToObj(hexCode){
        let channels = [],
            code = hexCode.toLowerCase().replace('#','').replace('0x','');

        for(let i=0;i<3;i++){
            channels.push(parseInt(`0x${code.substr(2*i,2)}`));
        }
        let [r=0,g=0,b=0] = channels;
        return {r, g, b};
    }

    static objToHex(obj){
        let v2h = (c) => {
            let h = parseInt(c).toString(16);
            return (h.length === 2)? h : "0" + h;
        }
        let {r,g,b} = {r:0, g:0, b:0,...obj};
        return [
            v2h(r),
            v2h(g),
            v2h(b)
        ].join('');
    }

    static valToChannels(val){
        if(Array.isArray(val)){
            let [r,g,b] = val;
            return {r, g, b};
        } else if(typeof val == 'object'){
            let {r,g,b} = {r: 0, g: 0, b: 0, ...val};
            return {r, g, b};
        } else if(typeof val == 'string'){
            return Color.hexToObj(val);
        } else {
            return {r: 0, g: 0, b: 0};
        }
    }
}

export default Color;
