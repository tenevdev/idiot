function randomInt(from, to) {
    return Math.floor(Math.random() * (from - to + 1)) + from
}

exports.randomInt = randomInt

exports.uid = function(length) {
    var buffer = [],
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charactersLength = characters.length

    for (var i = 0; i < length; i++) {
        buf.push(characters[randomInt(0, charactersLength - 1)])
    }
}
