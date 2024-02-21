function movingShift(s, shift) {
    function shiftChar(char, shift) {
        if (char.match(/[a-zA-Z]/)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.charCodeAt(0);
            const startCode = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const shiftedCode = (charCode - startCode + shift) % 26 + startCode;
            return String.fromCharCode(shiftedCode);
        }
        return char;
    }

    const codedString = Array.from(s).map((char, index) => shiftChar(char, shift + index)).join('');

    const partLength = Math.ceil(codedString.length / 5);
    const parts = [];
    let start = 0;

    for (let i = 0; i < 5; i++) {
        let end = start + partLength;
        if (i === 4) {
            end = codedString.length;
        }

        let part = codedString.slice(start, end).trimEnd();

        if ((i === 0 || i === 2) && part.length > 0 && i < 4) {
            part += ' ';
        }

        parts.push(part);
        start = end;
    }

    return parts;
}

const s = "I should have known that you would have a perfect answer for me!!!";
const shift = 1;
const result = movingShift(s, shift);
console.log(result);
