// 使用webpack.ProvidePlugin 套件在瀏覽器的Consloe是訪問不到$.fn.jquery的
//   <script>
// window.onload = function () {
//     console.log("jQuery version ", $);
//   };
// </script>

// 在普通的js文件也不行，使用了Webpack 打包的js才可以。

//使用了Webpack 打包的js，您可是直接使用 $ ，也可以使用
import $ from "jquery";
//來訪問jQuery 對象

//Get jQuery version
console.log("jQuery version ", $.fn.jquery);
