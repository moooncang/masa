// PSD 레이어를 PNG + manifest.json으로 내보냅니다. 페이지는 manifest가 있으면 PSD 대신 이 이미지를 먼저 읽어
// ag-psd 라이브러리(약 0.8MB)와 PSD 해석 시간을 건너뜁니다. PSD를 바꾸면 이 스크립트를 다시 실행하세요.
//
// 사용법 (저장소 루트에서):
//   npm install --no-save ag-psd
//   node tools/export-layers.cjs [assets/riana.psd] [assets/layers]
// ag-psd를 다른 위치에서 쓰려면 AG_PSD 환경변수에 모듈 경로를 지정하세요.
'use strict';
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const { readPsd, initializeCanvas } = require(process.env.AG_PSD || 'ag-psd');
// useImageData로 읽으므로 실제 canvas는 필요 없습니다. 픽셀 버퍼만 만들어 줍니다.
const imageData = (width, height) => ({ width, height, data: new Uint8ClampedArray(width * height * 4) });
initializeCanvas(() => ({ getContext: () => ({ createImageData: imageData }) }), undefined, imageData);

const input = process.argv[2] || 'assets/riana.psd';
const output = process.argv[3] || 'assets/layers';

// PNG 인코더: 행마다 None/Sub/Up/Paeth 필터 중 가장 작은 것을 고릅니다.
const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
function crc32(buffer) { let c = -1; for (const byte of buffer) c = CRC[(c ^ byte) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; }
function chunk(type, data) {
  const length = Buffer.alloc(4); length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]), crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}
function encodePng(width, height, rgba) {
  const stride = width * 4, raw = Buffer.alloc((stride + 1) * height), candidates = [0, 1, 2, 4].map(() => Buffer.alloc(stride));
  for (let y = 0; y < height; y++) {
    const row = rgba.subarray(y * stride, (y + 1) * stride), up = y ? rgba.subarray((y - 1) * stride, y * stride) : null;
    let best = 0, bestScore = Infinity;
    [0, 1, 2, 4].forEach((filter, index) => {
      const out = candidates[index]; let score = 0;
      for (let i = 0; i < stride; i++) {
        const a = i >= 4 ? row[i - 4] : 0, b = up ? up[i] : 0, c = up && i >= 4 ? up[i - 4] : 0;
        let predictor = 0;
        if (filter === 1) predictor = a; else if (filter === 2) predictor = b;
        else if (filter === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); predictor = pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
        const value = (row[i] - predictor) & 255; out[i] = value; score += value < 128 ? value : 256 - value;
      }
      if (score < bestScore) { bestScore = score; best = index; }
    });
    raw[y * (stride + 1)] = [0, 1, 2, 4][best]; candidates[best].copy(raw, y * (stride + 1) + 1);
  }
  const header = Buffer.alloc(13); header.writeUInt32BE(width, 0); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// 페이지와 같은 순서(아래→위)로 그룹을 펼칩니다.
function flatten(children, result = []) {
  for (const layer of children || []) {
    if (layer.children) flatten(layer.children, result);
    else if (layer.imageData?.width && layer.imageData?.height) result.push(layer);
  }
  return result;
}

const psd = readPsd(fs.readFileSync(input), { useImageData: true, skipCompositeImageData: true, skipThumbnail: true });
fs.mkdirSync(output, { recursive: true });
for (const file of fs.readdirSync(output)) if (file.endsWith('.png') || file === 'manifest.json') fs.unlinkSync(path.join(output, file));
const layers = flatten(psd.children).map((layer, index) => {
  const name = layer.name.trim(), file = `${String(index).padStart(2, '0')}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
  const { width, height, data } = layer.imageData;
  fs.writeFileSync(path.join(output, file), encodePng(width, height, Buffer.from(data.buffer, data.byteOffset, data.byteLength)));
  return { name, file, left: layer.left || 0, top: layer.top || 0, opacity: layer.opacity ?? 1, hidden: !!layer.hidden };
});
fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify({ source: path.basename(input), width: psd.width, height: psd.height, layers }, null, 1));
const total = fs.readdirSync(output).reduce((sum, file) => sum + fs.statSync(path.join(output, file)).size, 0);
console.log(`${layers.length}개 레이어 → ${output} (${(total / 1048576).toFixed(2)}MB)`);
