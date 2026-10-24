const DISTRESS_KEYWORDS = [
  "kill myself", "want to die", "end my life", "suicide",
  "self harm", "cut myself", "not worth living", "no reason to live",
  "hurt myself", "can't go on", "give up on life", "don't want to exist",
  "ending it all", "nobody cares", "better off dead",
];

const checkDistress = (text) => {
  const lower = text.toLowerCase();
  return DISTRESS_KEYWORDS.some((kw) => lower.includes(kw));
};

module.exports = checkDistress;