
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const dirVars = require('../../base/dir.conf')
const path = require('path')
  const modules=  {
      rules:[
          
               {
                    test: /\.js$/,
                    enforce: "pre",
                    exclude: /node_modules/,
                    include: dirVars.dev,
                    use: [
                        'babel-loader',
                        {
                            loader: 'istanbul-instrumenter-loader',
                            options: {
                              esModules: true
                            }
                        }
                    ]
                },
                 
                  {
                        test: /\.vue$/,
                        loader: 'vue-loader',
                        options: {
                            
                            loaders: {
                                js: 'babel-loader',
                                css: ExtractTextPlugin.extract({
                                    use: ["css-loader"],
                                    fallback: ['vue-style-loader'] 
                                }),
                                less: ExtractTextPlugin.extract({
                                    use: [
                                            {
                                                loader: 'css-loader',
                                                options:{
                                                    minimize: true, //css压缩
                                                    '-autoprefixer': true,
                                                }
                                            },
                                           // "postcss-loader",
                                            'less-loader'],
                                    fallback: ['vue-style-loader']
                                }),
                             },
                            postLoaders: {
                                js: 'istanbul-instrumenter-loader?esModules=true'
                            }
                        }
                    },
  
           
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test:/\.(css|less)$/,
                 use: ExtractTextPlugin.extract(
                     {
                        fallback: "style-loader", // 编译后用什么loader来提取css文件
                        use: [{
                                loader: 'css-loader',
                                options:{
                                    //minimize: true, //css压缩
                                    //'-autoprefixer': true,
                                }
                             },
                            // "postcss-loader",
                             "less-loader"]// 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
                    })
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/,
                use: [
                    
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 5000,
                        name: 'assets/images/[name]-[hash:8].[ext]',
                        //publicPath:  "/view/",
                      }
                    }
                  ]
            },
            // 字体loader
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: 'assets/font/[name]-[hash:8].[ext]'
                }
            }
            // { test: /\.(png|jpe?g|gif|svg)$/, 
            //     use: [{
            //         loader:'url-loader',
            //         options:{
            //             limit:'2500',
            //             name:'[name].[ext]?[hash]'
            //         }
            //     }]
            // },
           
        ]
}




module.exports = modules;



