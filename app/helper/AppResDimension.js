import React, {Dimensions} from 'react-native'

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;


// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1;

// We set our base font size value
const base_unit = 16;

const base_ratio_y = 0.0625;

const base_ratio_x = 0.0625;

const base_ratio_font = 0.0625;

// We add an em() shortcut function
function em(value) {
    return value * (base_unit * ratioX);
}

function emf(value) {
    return em(base_ratio_font * value);
}

function emX(value) {
    return value * (base_unit * ratioX);
}

function emY(value) {
    return value * (base_unit * ratioY);
}
export default AppResDimension = {
    // FONT SIZE
    em:em,
    emf:emf,
    emX:emX,
    emY:emY,
};