const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    console.log(blogs)
    return blogs.reduce(
        (total, blogs) => {
            return total + blogs.likes
        }, 0)
}

module.exports = {
    dummy,
    totalLikes,
}
