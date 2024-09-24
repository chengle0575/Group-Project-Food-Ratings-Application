const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/App.jsx', 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'], 
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto", 
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {		
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'file-loader',
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.mjs','.jpg','.png','.jpeg'],  
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, '/public'),
        compress: true,
        port: 3000,
        host:'0.0.0.0',
        historyApiFallback: true, //npm start uses dev server, this will always return the index.html file
    },
};