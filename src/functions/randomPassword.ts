import crypto from "crypto";

function getRandomInt(max: number): number {
    return crypto.randomInt(0, max);
}

function getRandomFromString(str: string): string {
    const randomNumber = getRandomInt(str.length);
    return str[randomNumber];
}

function shuffleArray<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = getRandomInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createPassword(length: number): string {
    if (length < 4) throw new Error("Password length must be at least 4");

    const digits = "0123456789";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";

    const allSets = [digits, lower, upper, symbols];
    const allChars = digits + lower + upper + symbols;

    let passwordArr = [];

    for (let set of allSets) passwordArr.push(getRandomFromString(set));

    for (let i = 0; i < length - 4; i++) {
        const c = getRandomFromString(allChars);
        passwordArr.push(c);
    }

    const shuffledPassword = shuffleArray(passwordArr);

    return shuffledPassword.join("");
}

export { createPassword };

// NV.dv1=2OIZzvbJ6 // EnB8(ba4l.-zqeof
