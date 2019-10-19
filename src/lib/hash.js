
export const Hash = {
    /**
     * Create object with attributes named and valued by matching order
     * 
     * @param {Array} keys Ordered keys array
     * @param {Array} values Ordered values array
     * @return {Object} Object with key-named attributes set to values
     * @memberof Hash
     */
    zipKeyValues: function(keys, values){
        let joined = {},
            min = Math.min(keys.length, values.length);
        for(let i=0; i<min; i++){
            joined[keys[i]] = values[i];
        }
        return joined;
    },

    /**
     * 'Unzip' object into array of arrays containing key followed by value
     * @param {Object} hash Object to unzip
     * @return {Array} Array of key-value arrays
     * @memberof Hash
     */
    unzipPairs: function(hash){
        let unzipped = [],
            keys = Object.keys(hash);
        keys.forEach(k => {
            unzipped.push([k, hash[k]]);
        });
        return unzipped;
    },

    /**
     * 'Unzip' object into array of objects with key and value attributes,
     * named based on provided params
     * @param {Object} hash Object to unzip
     * @param {String} keyName Name of output key attribute (default `key`)
     * @param {String} valueName Name of output value attribute (default `value`)
     * @return {Array} Array of unzipped key-value pair objects
     * @memberof Hash
     */
    unzipHashArray: function(hash, keyName='key', valueName='value'){
        let unzipped = Hash.unzipPairs(hash);
        return unzipped.map(p => {
            let [key, val] = p;
            return {
                [keyName]: key,
                [valueName]: val
            }
        });
    },

    extract: function(hash, keys){
        return keys.map(key => hash[key]);
    }
    
}