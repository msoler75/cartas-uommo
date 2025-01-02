import useConstants from "./constants.js";

const distributeCards = (cards) => {
    const constants = useConstants()
    const w = constants.CARD_WIDTH;
    const h = constants.CARD_HEIGHT;
    const ad = constants.ARC_DEGREES;
    const ar = constants.ARC_RADIANS;
    const rd = constants.ROTATION_DEGREES;
    const sr = constants.START_RADIANS;
    const n = cards.length;
    const r = constants.CIRCLE_RADIUS;
    const e = constants.CARD_ELEVATION;
    return cards.map((c, number) => {
      return {
        ...c,
        number,
        width: w,
        height: h + e,
        pos: (ad * number) / n,
        x: Math.sin((number / n) * ar + sr) * r + r + (h + e) / 2 - w / 2,
        y: -Math.cos((number / n) * ar + sr) * r + r,
        rotate: (number * ad) / n + rd,
      };
    });
}

export {
    distributeCards
}