import{test}from'node:test';import assert from'node:assert/strict';import{validate,nights}from'../netlify/functions/validation.mjs';
const sample=()=>({name:'Test family',ref:'BYT-123',kind:'created',passengers:[{name:'Test passenger'}],stays:[{city:'Makkah',hotel:'Test hotel',in:'2026-10-21',out:'2026-10-27'}]});
test('valid voucher keeps passengers and calculates nights',()=>{const r=validate(sample());assert.equal(r.pax,1);assert.equal(nights(r.stays[0].in,r.stays[0].out),6)});
test('reject checkout before or same day as checkin',()=>{for(const out of ['2026-10-20','2026-10-21']){const v=sample();v.stays[0].out=out;assert.throws(()=>validate(v),/checkout/)}});
test('reject missing passengers and hotel',()=>{const v=sample();v.passengers=[];assert.throws(()=>validate(v),/passenger/);v.passengers=[{name:'One'}];v.stays=[];assert.throws(()=>validate(v),/hotel/)});
test('PDF validates signature and strips unexpected fields',()=>{const v=validate({name:'One',ref:'BYT',kind:'pdf',pdf:Buffer.from('%PDF-1.7').toString('base64'),admin:true});assert.equal(v.admin,undefined);assert.throws(()=>validate({...v,pdf:'bm90IHBkZg=='}),/PDF/)});
