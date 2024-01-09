// boyerMoore.js

function preprocessPattern(pattern) {
  const m = pattern.length;
  const lastOccurrence = {};

  for (let i = 0; i < m - 1; i++) {
    lastOccurrence[pattern[i]] = m - 1 - i;
  }

  return lastOccurrence;
}

function boyerMooreMatch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const lastOccurrence = preprocessPattern(pattern);

  let i = m - 1; // index for pattern
  let j = m - 1; // index for text

  while (j < n) {
    if (pattern[i] === text[j]) {
      if (i === 0) {
        // Match found
        return j;
      }
      i--;
      j--;
    } else {
      const lastOccur = lastOccurrence[text[j]] || m;
      j += Math.max(lastOccur, m - i);
      i = m - 1;
    }
  }

  // Pattern not found
  return -1;
}

module.exports = boyerMooreMatch;
