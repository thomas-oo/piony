const codeColorMap = {
  low: 'green',
  medium: 'yellow',
  high: 'red'
};

const codeColor = function(code) {
  return codeColorMap[code];
}

export default {
  codeColor,
}