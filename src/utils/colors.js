
function calculateLuminance(rgb){
    // Luminance formula from https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
    // eslint-disable-next-line no-magic-numbers
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function hexToRBG(colorStr) {
    return [
      parseInt(colorStr.substring(1, 3), 16 ),
      parseInt(colorStr.substring(3, 5), 16 ),
      parseInt(colorStr.substring(5, 7), 16 ),
    ];
}
export function getReadableColor(hexColor) {
    const luminance = calculateLuminance(hexToRBG(hexColor));
    return (luminance < 140) ? "#fff" : "#000";
}
