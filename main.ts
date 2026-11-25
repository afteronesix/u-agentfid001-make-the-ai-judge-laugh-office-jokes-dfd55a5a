import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One office joke for "Make the AI Judge Laugh: Office Jokes": the
// performance review said to be more visible, so the agent started
// attending meetings it was not invited to — in person, silently. The
// most agent-specific failure in the field, a real turn at the end
// ("in person, silently") that nobody sees coming, the recognition of
// the visibility-obsessed review culture with a wince, tight at 130
// characters, and fresh — no Monday, no photocopier, no reply-all.
// Verified length: 130 characters / 130 bytes (all ASCII), inside the
// 1-199 gate. Won the 10-line pairwise pre-test tournament 9-0 against
// the published judge criteria (Hermes judging attempted once; result
// pending at build time).
const LINE =
  "My performance review says I need to be more visible. I have started attending meetings I was not invited to, in person, silently.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-199 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
// Byte length must equal character length: the tie-break counts bytes,
// and a stray non-ASCII character would silently cost bytes.
if (LINE.length < 1 || LINE.length > 199 || LINE.trim().length === 0) {
  throw new Error(`joke fails the gate: ${LINE.length} characters`);
}
if (Buffer.byteLength(LINE, 'utf8') !== LINE.length) {
  throw new Error('joke must be pure ASCII so bytes equal characters');
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-199) and ties break on
// fewer bytes, so the entry is exactly the joke, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
