const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(
        (total, blogs) => {
            return total + blogs.likes
        }, 0)
}

const favPost = (blogs) => {
    return blogs.reduce(
        (fav, blogs) => {
            return fav.likes > blogs.likes 
            ? fav 
            : blogs
        }, {})
}

module.exports = {
    dummy,
    totalLikes,
    favPost,
}
