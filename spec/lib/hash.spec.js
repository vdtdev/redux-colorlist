// const Hash = require('../../src/lib/hash');
import {Hash} from '../../src/lib/hash';

describe('Hash class', function(){
    describe('zipKeyValues method', function(){
        it('creates correct object', function(){
            let zObj = Hash.zipKeyValues(['x','y','z'],[1,2,3]);
            expect(zObj.x).toEqual(1);
            expect(zObj.y).toEqual(2);
            expect(zObj.z).toEqual(3);
        })
    });
    describe('unzipPairs method', function(){
        it('creates correct pairs', function(){
            let keys = ['x1','y1','x2','y2'],
                vals = [-5, 5, 10, -8];
            let pairs = Hash.unzipPairs({
                x1: -5, y1: 5, x2: 10, y2: -8
            });
            for(let i=0;i<pairs.length;i++){
                expect(pairs[i][0]).toEqual(keys[i]);
                expect(pairs[i][1]).toEqual(vals[i]);
            }
        })
    })
    describe('unzipHashArray method', function(){
        it('creates correct hashes', function(){
            let src = {x1: -5, y1: -10, x2: 8, y2: 3},
                hArr = Hash.unzipHashArray(src, 'coord', 'val'),
                keys = Object.keys(src),
                vals = Object.values(src);
            hArr.forEach((h, i) => {
                expect(h.coord).toEqual(keys[i]);
                expect(h.val).toEqual(vals[i]);
            })
        })
    })
})