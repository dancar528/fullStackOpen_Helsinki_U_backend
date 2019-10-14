const _ = require('lodash')

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

/*
    explaination of:
        blogs = _.chain(blogs).groupBy('author').groupBy('length').value()

    1) _.chain(blogs).groupBy('author').value():
        gets blogs list grouping by author, it would look like:
        {
            'blog's author name 1': blogs[2],
            'blog's author name 2': blogs[1],
            'blog's author name 3': blogs[1]
        }

    2) _.chain(blogs).groupBy('author').groupBy('length').value()
        it gets blogs author list grouping length, which would look like:
        (it returns sorted asc, so the last item is the largest amount of blogs)
        {
            '1': [ [ [Object] ], [ [Object] ]
            '2': [ [ [Object], [Object] ] ]
        }
*/
const mostBlogs = blogs => {

    if (blogs.length === 0) {
        return { message: 'Blog list is empty' }
    }

    blogs = _.chain(blogs).groupBy('author').groupBy('length').value()
    const maxNumberOfBlogs = Number(_.chain(blogs).keys().max().value())
    let authorMostBlogs = blogs[maxNumberOfBlogs][0][0].author

    if (typeof authorMostBlogs === 'undefined') {
        authorMostBlogs = 'No author'
    }
    return {
        author: authorMostBlogs,
        blogs: maxNumberOfBlogs
    }
}

const mostLikes = blogs => {

    if (blogs.length === 0) {
        return { message: 'Blog list is empty' }
    }

    const authorMostLikes = _.chain(blogs).groupBy('author').map((blogs, author) => {
        let likes = 0; // accumulate the likes per author
        _.each(blogs, (blog) => {
            likes += blog['likes']
        })
        return {
            author: author,
            likes: likes
        }
    }).orderBy('likes', 'desc').first().value()

    return authorMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}