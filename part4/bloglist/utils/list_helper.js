const _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (listOfBlogs) => {
    const listOfLikes = listOfBlogs.map(blog => blog.likes)
    const sumOfLikes = listOfLikes.reduce((sum,item)=> sum+item, 0)
    return sumOfLikes
}

const favoriteBlog = (listOfBlogs) => {
    const arrayWithLikes = listOfBlogs.map(blog => blog.likes)
    //console.log(arrayWithLikes)
    const highestLikes = Math.max(...arrayWithLikes)
    //console.log(highestLikes)
    const blogWithHighestLikes = listOfBlogs.filter(blog => blog.likes === highestLikes)
    //console.log(blogWithHighestLikes);
    return blogWithHighestLikes[0]
}

const mostBlogs = (listOfBlogs) => {
    const arrayOfAuthors = listOfBlogs.map(blog => blog.author)
    //console.log(arrayOfAuthors)
    const count = {}
    arrayOfAuthors.forEach(author => {
        count[author] = (count[author] || 0) + 1
    })
    //Using lodash
    //Using lodash to convert object into array
    const countArray = Object.entries(count)

    //this will convert countArray into key,value object pairs inside array
    const countArrayObject = countArray.map(([author,blogs]) => ({author,blogs}))
    
    const maxBlogs = _.maxBy(countArrayObject,'blogs')
    return maxBlogs
}

const mostLikes = (listOfBlogs) => {
    const maxLikesObject = _.maxBy(listOfBlogs,'likes')
    console.log(maxLikesObject);
    const result = {
        author: maxLikesObject.author,
        likes: maxLikesObject.likes
    }
    console.log(result);
    return result
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }