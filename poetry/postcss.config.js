module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')({
          browsers: ['last 7 versions']
        })
    ]
}