// 배포용 폴더(dist/web)와 zip(dist/reina-massage.zip)을 만듭니다. Cloudflare Pages와 itch.io 모두 이 결과물을 그대로 씁니다.
// PixiJS를 CDN 대신 lib/에 넣어 외부 스크립트 없이 실행되게 하고(itch는 별도 도메인 iframe에서 실행), PSD는 넣지 않습니다(레이어 이미지만 사용).
// _headers는 Cloudflare Pages의 캐시 설정이며, 다른 곳에서는 무시됩니다.
//
// 사용법 (저장소 루트에서):
//   npm install --no-save pixi.js@7.4.3
//   node tools/build-dist.cjs
// 다른 위치의 pixi.min.js를 쓰려면: node tools/build-dist.cjs <pixi.min.js 경로>
'use strict';
const fs = require('fs'), path = require('path'), zlib = require('zlib');

const CDN = 'https://cdn.jsdelivr.net/npm/pixi.js@7.4.3/dist/pixi.min.js';
const pixiPath = process.argv[2] || 'node_modules/pixi.js/dist/pixi.min.js';
const output = 'dist/reina-massage.zip', folder = 'dist/web';

const html = fs.readFileSync('index.html', 'utf8');
if (!html.includes(CDN)) throw new Error('index.html에서 PixiJS CDN 주소를 찾지 못했습니다. tools/build-dist.cjs의 CDN 값을 맞춰주세요.');
const pixi = fs.readFileSync(pixiPath);
if (!pixi.subarray(0, 200).toString().includes('v7.4.3')) throw new Error(`${pixiPath}가 pixi.js v7.4.3이 아닙니다.`);
if (!fs.existsSync('assets/layers/manifest.json')) throw new Error('assets/layers가 없습니다. 먼저 tools/export-layers.cjs를 실행하세요.');

const files = [
  ['index.html', Buffer.from(html.replace(CDN, './lib/pixi.min.js'))],
  ['lib/pixi.min.js', pixi],
  ['_headers', Buffer.from('/lib/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/*\n  Cache-Control: public, max-age=86400\n')],
  ...fs.readdirSync('assets/layers').sort().map(file => [`assets/layers/${file}`, fs.readFileSync(path.join('assets/layers', file))]),
];

// 최소 zip 작성기(deflate, UTF-8 파일 이름). 경로 구분자는 항상 '/'입니다.
const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc32 = buffer => { let c = -1; for (const byte of buffer) c = CRC[(c ^ byte) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const now = new Date(), dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1), dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
const locals = [], centrals = [];
let offset = 0;
for (const [name, data] of files) {
  const nameBytes = Buffer.from(name, 'utf8'), compressed = zlib.deflateRawSync(data, { level: 9 }), crc = crc32(data);
  const local = Buffer.alloc(30); local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6); local.writeUInt16LE(8, 8);
  local.writeUInt16LE(dosTime, 10); local.writeUInt16LE(dosDate, 12); local.writeUInt32LE(crc, 14); local.writeUInt32LE(compressed.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(nameBytes.length, 26);
  const central = Buffer.alloc(46); central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(0x0800, 8); central.writeUInt16LE(8, 10);
  central.writeUInt16LE(dosTime, 12); central.writeUInt16LE(dosDate, 14); central.writeUInt32LE(crc, 16); central.writeUInt32LE(compressed.length, 20); central.writeUInt32LE(data.length, 24); central.writeUInt16LE(nameBytes.length, 28); central.writeUInt32LE(offset, 42);
  locals.push(local, nameBytes, compressed); centrals.push(central, nameBytes);
  offset += local.length + nameBytes.length + compressed.length;
}
const directory = Buffer.concat(centrals), end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(offset, 16);
fs.rmSync(folder, { recursive: true, force: true });
for (const [name, data] of files) { const target = path.join(folder, name); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, data); }
fs.writeFileSync(output, Buffer.concat([...locals, directory, end]));
console.log(`${files.length}개 파일 → ${folder}/ 와 ${output} (${(fs.statSync(output).size / 1048576).toFixed(2)}MB)`);
