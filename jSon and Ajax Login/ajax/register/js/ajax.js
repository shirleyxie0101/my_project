        // 封装通用的xhr,兼容各个版本
        function createXHR() {
            //判断浏览器是否将XMLHttpRequest作为本地对象实现，针对IE7，Firefox，Opera等浏览器
            if (typeof XMLHttpRequest != "undefined") {
                console.log("hello")
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
              //将所有可能出现的ActiveXObject版本放在一个数组中
              var xhrArr = ['Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
              //遍历创建XMLHttpRequest对象
              var len = xhrArr.length;
              for (var i=0;i<len;i++)
              {
                  try
                  {
                      //创建XMLHttpRequest对象
                      xhr = new ActiveXObject(xhrArr[i]);
                      //如果创建XMLHttpRequest对象成功，则跳出循环
                      break;
                  }
                  catch(ex)
                  {
                  }
              }
            } else {
                throw new Error("No XHR object available.");
            }
        }

        var xhr = createXHR();
        //响应XMLHttpRequest对象状态变化的函数
        xhr.onreadystatechange = function () {
            //异步调用成功
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    //获得服务器返回的数据
                    checkRegister(JSON.parse(xhr.responseText));
                } else {
                    console.log('unsuccess');
                }
            }
        };
        var user = document.getElementById("user");
        user.onblur = function(){
            var username = this.value;
            xhr.open('post', 'http://127.0.0.1/register/server/isUserRepeat.php', true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            //发送http请求
            xhr.send('username='+username);
        }

        function checkRegister(result){
            console.log(result.msg);
        }
