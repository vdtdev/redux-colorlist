// const Color = require('../../src/lib/color');
import Color from '../../src/lib/color';
const testColors = [
    { name: 'red',      h: 'ff0000', v: [255,0,0] },
    { name: 'green',    h: '00ff00', v: [0,255,0] },
    { name: 'blue',     h: '0000ff', v: [0,0,255] },
    { name: 'gray',     h: '808080', v: [128,128,128] }
];

var codeHtml = c => `#${c}`,
    codeHex  = c => `0x${c}`,
    valObj   = v => {
        let [r,g,b] = v;
        return {r,g,b};
    },
    /**
     * Make new Color instance with same properties as source
     * @param {Color} color Color instance
     */
    cloneColor = (color) => new Color(color.name, color.colorCode);

/**
 * Expect statement formulas
 */
var expectFormulas = {
    channels: (src, exp) => {
        ['r','g','b'].forEach(ch => expect(src[ch]).toEqual(exp[ch]));
    }
};

describe('Color class', function(){
    describe('Static color conversion method', function(){
        describe('hexToObj', function(){
            let h2oTestRun = (convFunc) => {
                testColors.forEach(c => {
                    let result = Color.hexToObj(convFunc(c.h)),
                        expObj = valObj(c.v);
                    expect(result.r).toEqual(expObj.r);
                    expect(result.g).toEqual(expObj.g);
                    expect(result.b).toEqual(expObj.b);
                });
            };
            it('converts unprefixed hex code', function(){
                h2oTestRun(v => v);
            });
            it('converts HTML prefixed hex code', function(){
                h2oTestRun(codeHtml);
            });
            it('converts hex prefixed hex code', function(){
                h2oTestRun(codeHex);
            });
        });
        describe('obj2Hex', function(){
            it('converts full color objects to hex', function(){
                testColors.forEach(c => {
                    let code = Color.objToHex(valObj(c.v));
                    expect(code).toEqual(c.h);
                });
            });
        });
        describe('valToChannels', function(){
            it('converts object', function(){
                let c = Color.valToChannels({r: 1, g: 2, b: 3});
                expect(c).toEqual({r: 1, g: 2, b: 3});
            })
        })
    });
    describe('Constructor', function(){
        /**
         * Call expects on each test color for constructor, using a custom
         * method for formatting value constructor param
         * @param {Function} valFunc Function that returns constructor color
         *      value taken from argument which is a testColor
         */
        var constTestRun = (valFunc) => {
            testColors.forEach(c => {
                let srcVal = valFunc(c),
                    testInst = new Color(c.name, srcVal);
                expect(testInst.name).toEqual(c.name);
                expect(testInst.colorCode).toEqual(c.h);
            });
        };
        it('accepts array color values', function(){
            constTestRun(c => c.v);
        });
        it('accepts hex color values', function(){
            constTestRun( c => c.h);
        });
        it('accepts object color values', function(){
            constTestRun( c => { let [r,g,b] = c.v; return {r,g,b}; });
        });
    });
    describe('instance property', function(){
        /**
         * Tests property setters using testColors items
         * 
         * Value Functions are passed original property value, color instance,
         * and testColor item
         * 
         * @param {String} propName Name of property to test
         * @param {Function} setValFunc Returns value to assign with setter
         * @param {Function} expectValFunc Returns expected property value after set
         * @param {Function} expectFormula Optional function that runs expect calls on pair of values
         */
        let setPropTestRun = (propName, setValFunc, expectValFunc, expectFormula) => {
            let runExpect = (tVal,exVal) => {
                if(expectFormula){
                    expectFormula(tVal,exVal);
                } else {
                    expect(tVal).toEqual(exVal);
                }
            };
            instances.forEach(i => {
                let clone = cloneColor(i.color),
                    src = {...i.src, v: valObj(i.src.v)},
                    origVal = clone[propName];
                let setValue = setValFunc(origVal, clone, src),
                    expectedValue = expectValFunc(origVal, clone, src);
                // test initial property value 
                runExpect(clone[propName], origVal);
                // set prop value
                clone[propName] = setValue;
                // check that property returns expected new value
                runExpect(clone[propName], expectedValue);
            });
        };
        var instances = [];
        /**
         * Fill instances array with objects containing new color instance
         * using params from each testColors, along with reference to source
         * testColor item
         */
        beforeAll(function(){
            testColors.forEach(c => {
                instances.push(
                    {
                        src: c,
                        color: new Color(c.name, c.v)
                    }
                );
            });
        });
        it('get colorChannels is correct', function(){
            instances.forEach(i => {
                let t = i.color.colorChannels,
                    ex = valObj(i.src.v);
                ['r','g','b'].forEach(ch => expect(t[ch]).toEqual(ex[ch]));
            });
        });
        it('get colorCode is correct', function(){
            instances.forEach(i => {
                let t = i.color.colorCode,
                    ex = i.src.h;
                expect(t).toEqual(ex);
            });
        });
        describe('set colorChannels', function(){
            it('test instances array is filled', function(){
                expect(instances.length).toBeGreaterThan(0);
            });
            /**
             * Wraps setPropTestRun, giving propety name
             * @param {*} valuesFunc 
             * @param {*} expectFormula 
             */
            let testRun = (valuesFunc, expectFormula) => {
                setPropTestRun('colorChannels', valuesFunc, expectFormula);
            };
            
            it('updates when given all channels', function(){
                let newValue = {r: 1, g: 2, b: 3};
                testRun(
                    () => newValue,
                    () => newValue,
                    expectFormulas.channels
                );
            });
            it('updates when given partial channels', function(){
                let newValue = {r: 200, b: 13};
                testRun(
                    () => newValue,
                    (oVal) => { return {...oVal, ...newValue}; },
                    expectFormulas.channels
                )
            })
        });
        describe('set colorCode', function(){
            it('test instances array is filled', function(){
                expect(instances.length).toBeGreaterThan(0);
            });
            /**
             * Wraps setPropTestRun, giving propety name
             * @param {*} valuesFunc 
             * @param {*} expectFormula 
             */
            let testRun = (valuesFunc, expectFormula) => {
                setPropTestRun('colorCode', valuesFunc, expectFormula);
            };
            
            it('updates when given plain code', function(){
                let newValue = '012345'
                testRun(
                    () => newValue,
                    () => newValue
                );
            });
            it('updates when given hex prefixed code', function(){
                let newValue = '012345'
                testRun(
                    () => codeHex(newValue),
                    () => newValue
                );
            });
            it('updates when given HTML prefixed code', function(){
                let newValue = '012345'
                testRun(
                    () => codeHtml(newValue),
                    () => newValue
                );
            });
        })
    })
});