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

const favoriteBlog = blogs => {
    let highestLike = 0
    let favoriteBlogIndex = {}
    if (blogs.length === 0)
        return {
            message: 'Blog list is empty'
        }
    blogs.forEach((element, i) => {
        if (element.likes > highestLike) {
            highestLike = element.likes
            favoriteBlogIndex = i
        }
    })
    if (highestLike === 0) {
        return {
            message: 'There is not a favorite blog yet'
        }
    } else {
        return {
            title: blogs[favoriteBlogIndex].title,
            author: blogs[favoriteBlogIndex].author,
            likes: blogs[favoriteBlogIndex].likes
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}