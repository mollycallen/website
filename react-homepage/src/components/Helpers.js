export function roundInteger(x) {
    let rounded = Math.round(x * 10) / 10;
    return rounded.toFixed(1);
} 