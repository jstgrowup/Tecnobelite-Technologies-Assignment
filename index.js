import bcrypt from "bcrypt";
const pass = "abcd";
const hash = await bcrypt.hash(pass, 10);
const isMatch = await bcrypt.compare("abcd", hash);
console.log(isMatch);
