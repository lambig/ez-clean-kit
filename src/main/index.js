const toModulo2 = e => Math.abs(e % 2);
const toSum = (a, b) => a + b;
const findOutlier = integers => {
    const isOutlierOdd = integers.slice(0, 3).map(toModulo2).reduce(toSum) > 1;
    const byBeingOutlier = isOutlierOdd ? e => !(e % 2) : e => e % 2;
    return integers.find(byBeingOutlier);
}
