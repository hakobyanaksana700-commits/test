// Renders the animatic's synthesized SFX/music bed to a WAV file.
// Pure Node, no dependencies — mirrors the Web Audio cue schedule
// from getcard-reels-animatic.html's scheduleAll().
'use strict';
const fs = require('fs');

const SR = 44100;
const DURATION = 35.5; // small tail so the last cue's release fully decays
const N = Math.ceil(SR * DURATION);
const L = new Float32Array(N);
const R = new Float32Array(N);

function addSample(t, v){
  const i = Math.round(t * SR);
  if (i < 0 || i >= N) return;
  L[i] += v;
  R[i] += v;
}

// exponential-envelope oscillator burst (mirrors tone()/sweep())
function tone(time, freq, dur, type, peak, freq2){
  type = type || 'sine';
  peak = peak == null ? 0.2 : peak;
  const start = Math.max(0, Math.floor(time * SR));
  const end = Math.min(N, Math.ceil((time + dur) * SR));
  const attack = 0.015;
  for (let i = start; i < end; i++){
    const t = i / SR - time;
    let g;
    if (t < attack){ g = 0.0001 * Math.pow(peak / 0.0001, t / attack); }
    else { g = peak * Math.pow(0.0001 / peak, (t - attack) / Math.max(dur - attack, 0.001)); }
    const f = freq2 ? freq * Math.pow(freq2 / freq, Math.min(t, dur) / dur) : freq;
    const phase = 2 * Math.PI * f * t;
    let s;
    if (type === 'sine') s = Math.sin(phase);
    else if (type === 'square') s = Math.sign(Math.sin(phase));
    else if (type === 'triangle') s = (2 / Math.PI) * Math.asin(Math.sin(phase));
    else s = Math.sin(phase);
    addSample(i / SR, s * g);
  }
}

// band-limited noise burst (mirrors noiseBurst()) — simple resonant bandpass
function noiseBurst(time, dur, centerFreq, peak){
  const start = Math.max(0, Math.floor(time * SR));
  const end = Math.min(N, Math.ceil((time + dur) * SR));
  // two-pole resonant bandpass state
  const w0 = 2 * Math.PI * centerFreq / SR;
  const Q = 3.2;
  const alpha = Math.sin(w0) / (2 * Q);
  const b0 = alpha, b1 = 0, b2 = -alpha;
  const a0 = 1 + alpha, a1 = -2 * Math.cos(w0), a2 = 1 - alpha;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  const attack = 0.03;
  for (let i = start; i < end; i++){
    const t = i / SR - time;
    const x0 = (Math.random() * 2 - 1);
    const y0 = (b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x0; y2 = y1; y1 = y0;
    let g;
    if (t < attack){ g = peak * (t / attack); }
    else { g = peak * Math.pow(0.0001 / peak, (t - attack) / Math.max(dur - attack, 0.001)); }
    addSample(i / SR, y0 * g);
  }
}

// slow multi-oscillator pad with attack/sustain/release
function pad(time, dur, freqs, peak){
  const start = Math.max(0, Math.floor(time * SR));
  const end = Math.min(N, Math.ceil((time + dur) * SR));
  const attack = dur * 0.25, releaseStart = dur * 0.7;
  for (let i = start; i < end; i++){
    const t = i / SR - time;
    let g;
    if (t < attack){ g = peak * (t / attack); }
    else if (t < releaseStart){ g = peak; }
    else { g = peak * Math.pow(0.0001 / peak, (t - releaseStart) / Math.max(dur - releaseStart, 0.001)); }
    let s = 0;
    for (const f of freqs){ s += Math.sin(2 * Math.PI * f * t) / freqs.length; }
    addSample(i / SR, s * g);
  }
}

function scheduleAll(){
  // fast tension pulses across the opening hook (0 - 7s)
  for (let t = 0.15; t < 6.9; t += 0.4){ tone(t, 58, 0.16, 'sine', 0.055); }

  // decline stamp hit
  tone(1.62, 340, 0.24, 'square', 0.16, 120);
  noiseBurst(1.64, 0.1, 1800, 0.08);

  // "not accepted" negative accent
  tone(3.05, 150, 0.2, 'square', 0.09);

  // whoosh at every cut
  [1.6, 3.0, 4.4, 5.4, 7.0, 11.5, 20.0, 26.0].forEach(t => noiseBurst(t, 0.22, 900, 0.055));

  // bass drop + shimmer exactly on the GetCard reveal
  tone(7.0, 220, 0.9, 'sine', 0.32, 46);
  tone(7.05, 880, 0.25, 'triangle', 0.09);
  tone(7.18, 1108, 0.25, 'triangle', 0.08);
  tone(7.32, 1318, 0.35, 'triangle', 0.08);

  // steady confident beat under "how it works" + "one tool"
  for (let b = 7.5; b < 25.6; b += 0.5){ tone(b, 60, 0.14, 'sine', 0.075); }
  pad(7.2, 14.2, [220, 277, 330], 0.045);

  // success chime at end of the flow explainer
  tone(19.2, 660, 0.2, 'sine', 0.1);
  tone(19.35, 990, 0.25, 'sine', 0.09);

  // quick-cut taps
  [20.3, 22.3, 24.3].forEach(t => tone(t, 1500, 0.04, 'square', 0.055));

  // outro pad + final chord
  pad(26.0, 8.6, [196, 247, 294], 0.075);
  tone(32.5, 1200, 0.12, 'sine', 0.045);
}

scheduleAll();

// soft-clip limiter to keep peaks under 0dBFS
function softclip(v){
  const x = v;
  return Math.tanh(x * 1.0);
}
for (let i = 0; i < N; i++){ L[i] = softclip(L[i]); R[i] = softclip(R[i]); }

// write 16-bit PCM stereo WAV
const bytesPerSample = 2, numChannels = 2;
const dataSize = N * numChannels * bytesPerSample;
const buf = Buffer.alloc(44 + dataSize);
buf.write('RIFF', 0);
buf.writeUInt32LE(36 + dataSize, 4);
buf.write('WAVE', 8);
buf.write('fmt ', 12);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); // PCM
buf.writeUInt16LE(numChannels, 22);
buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * numChannels * bytesPerSample, 28);
buf.writeUInt16LE(numChannels * bytesPerSample, 32);
buf.writeUInt16LE(16, 34);
buf.write('data', 36);
buf.writeUInt32LE(dataSize, 40);
let off = 44;
for (let i = 0; i < N; i++){
  buf.writeInt16LE(Math.max(-1, Math.min(1, L[i])) * 32767, off); off += 2;
  buf.writeInt16LE(Math.max(-1, Math.min(1, R[i])) * 32767, off); off += 2;
}
const outPath = process.argv[2] || 'audio.wav';
fs.writeFileSync(outPath, buf);
console.log('wrote', outPath, dataSize, 'bytes of PCM,', DURATION, 's');
