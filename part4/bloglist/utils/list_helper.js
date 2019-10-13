const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let acumulator = 0
    blogs.forEach(element => {
        acumulator += element.likes
    })
    return acumulator
}

module.exports = {
    dummy,
    totalLikes
}