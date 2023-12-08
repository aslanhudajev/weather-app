const MathUtil = (function () {
    function RandomRange (max) {
        return Math.floor(Math.random() * max);
    }
    return { RandomRange };
})()

export { MathUtil }