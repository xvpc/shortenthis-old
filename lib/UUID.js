export default function UUID() {
    let UUID = ''
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "H", "I", "J", "M", "L", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    for (let i = 0; i < 7; i++) {
      UUID += letters[Math.floor(Math.random() * 10)]
    }
    return UUID
}
