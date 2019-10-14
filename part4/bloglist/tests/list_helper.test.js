const listHelper = require('../utils/list_helper')
const blogs = [
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Lune",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Song of Ice and Fire I",
        author: "George R.R. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Song of Ice and Fire II",
        author: "George R.R. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Song of Ice and Fire III",
        author: "George R.R. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Song of Ice and Fire IV",
        author: "George R.R. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Dorian Gray",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
]
test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)

    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const blogs = [
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
          }
        ]
        const result = listHelper.totalLikes(blogs)

        expect(result).toBe(2)
    })
    test('when blog list is empty total likes should be equals zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    test('when list has more than one blog it should return the sum of their likes', () => {
        expect(listHelper.totalLikes(blogs)).toBe(48)
    })
})

describe('favorite blog', () => {
    test('when blog list is empty it should report this fact', () => {
        expect(listHelper.favoriteBlog([])).toEqual({ message: 'Blog list is empty' })
    })

    test('when list has many blogs which all of them have not likes it should return a message reporting this fact', () => {
            const blogs = [
                {
                    _id: "5a422ba71b54a676234d17fb",
                    title: "TDD harms architecture",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                    likes: 0,
                    __v: 0
                },
                {
                    _id: "5a422aa71b54a676234d17f8",
                    title: "Go To Statement Considered Harmful",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                    likes: 0,
                    __v: 0
                  },
                  {
                    _id: "5a422b3a1b54a676234d17f9",
                    title: "Canonical string reduction",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                    likes: 0,
                    __v: 0
                  }
            ]
            expect(listHelper.favoriteBlog(blogs)).toEqual({ message: 'There is not a favorite blog yet' })
    })

    test('when list has only one blog which has not likes it should report this fact', () => {
        const blogs = [
            {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0,
                __v: 0
            }
        ]
        expect(listHelper.favoriteBlog(blogs)).toEqual({ message: 'There is not a favorite blog yet' })
    })

    test('when list has only one blog wich has likes it should return the likes of that', () =>{
        const blogs = [
            {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 10,
                __v: 0
            }
        ]
        expect(listHelper.favoriteBlog(blogs)).toEqual({
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            likes: 10
        })
    })

    test('when list has many blogs which some/all of them have likes and there is one which has the highest number of likes it should return this blog', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual({
            title: "Canonical string reduction",
            likes: 12,
            author: "Edsger W. Dijkstra"
        })
    })

    test('when list has many blogs which some/all of them have likes and there are several blogs with the highest number of likes it should return the first of them in the list', () => {
        blogs.push({
                title: "ES6",
                likes: 12,
                author: "University of Helsinki"
            })

        expect(listHelper.favoriteBlog(blogs)).toEqual({
            title: "Canonical string reduction",
            likes: 12,
            author: "Edsger W. Dijkstra"
        })
    })
})

describe('most blogs', () =>{
    test('when blog list is empty it should report this fact', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({ message:  'Blog list is empty'})
    })
    test('when the author who has the most number of blogs is undefined it should report this fact', () => {
        const additionalBlogs = [
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            },
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Song of Ice and Fire II",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            },
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Song of Ice and Fire II",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            },
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Song of Ice and Fire II",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            }
        ]
        blogsTest = blogs.concat(additionalBlogs)
        const result = listHelper.mostBlogs(blogsTest)
        expect(result).toEqual({
            author: 'No author',
            blogs: 7
        })
    })
})