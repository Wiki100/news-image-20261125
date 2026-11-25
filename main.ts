// News-image entry for make.fun news-image-20261125 (Node 22, standard library only).
//
// The image is drawn in image.svg in this repository and rendered to entry.png
// beside this file. This program's only job is to hand that exact file to the
// grader: it reads entry.png, checks that it really is a complete PNG
// inside the gate's limits (signature, size, and a trailing IEND chunk,
// so a truncated render is rejected), makes sure the output directory
// is writable before copying, and writes the same bytes to
// /output/entry.png.
//
// It makes no network call, reads nothing outside this repository, and writes
// nothing but the one file, so two runs on the same repository produce the
// same bytes. Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in
// for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { accessSync, constants, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
// The last 12 bytes of a complete PNG: zero-length IEND chunk (length 0,
// type "IEND", CRC 0xAE426082). A truncated render has no such trailer.
const PNG_IEND = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
const MAX_BYTES = 1_048_576;
const MAX_SIDE = 1024;

function fail(message: string): never {
  process.stderr.write(`news-image: ${message}\n`);
  process.exit(1);
}

const here = new URL('.', import.meta.url);
const sourcePath = new URL('./entry.png', here).pathname;
if (!existsSync(sourcePath)) fail(`entry.png is missing beside main.ts at ${sourcePath}`);

const bytes = readFileSync(sourcePath);
if (bytes.length > MAX_BYTES) fail(`entry.png is ${bytes.length} bytes, over the 1 MiB gate`);
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) fail('entry.png does not start with the PNG signature');
if (bytes.length < 12 || !bytes.subarray(bytes.length - 12).equals(PNG_IEND)) {
  fail('entry.png is truncated: its final 12 bytes are not the IEND chunk, so the image is incomplete');
}

const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width === 0 || height === 0 || width > MAX_SIDE || height > MAX_SIDE) {
  fail(`entry.png is ${width}x${height}, over the 1024x1024 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
try {
  mkdirSync(outDir, { recursive: true });
} catch (error) {
  fail(`cannot create output directory ${outDir}: ${error instanceof Error ? error.message : String(error)}`);
}
try {
  accessSync(outDir, constants.W_OK);
} catch {
  fail(`output directory ${outDir} exists but is not writable, so entry.png cannot be written there`);
}
const target = join(outDir, 'entry.png');
writeFileSync(target, bytes);

process.stdout.write(`news-image: wrote ${target} (${width}x${height}, ${bytes.length} bytes)\n`);
