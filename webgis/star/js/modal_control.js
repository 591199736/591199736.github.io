/**
* @desc 属性改变监听，属性被set时出发watch的方法，类似vue的watch
* @study https://www.jshaman.com/
* @constructor
* @param {object} opts - 构造参数. @default {data:{},watch:{}};
* @argument {object} data - 要绑定的属性
* @argument {object} watch - 要监听的属性的回调
* watch @callback (newVal,oldVal) - 新值与旧值
*/
class watcher {
    constructor(opts) {
        this.$data = this.getBaseType(opts.data) === 'Object' ? opts.data : {};
        this.$watch = this.getBaseType(opts.watch) === 'Object' ? opts.watch : {};
        for (let key in opts.data) {
            this.setData(key)
        }
    }
    getBaseType(target) {
        const typeStr = Object.prototype.toString.apply(target);

        return typeStr.slice(8, -1);
    }
    setData(_key) {
        Object.defineProperty(this, _key, {
            get: function () {
                return this.$data[_key];
            },
            set: function (val) {
                const oldVal = this.$data[_key];
                if (oldVal === val) return val;
                this.$data[_key] = val;
                this.$watch[_key] && typeof this.$watch[_key] === 'function' && (
                    this.$watch[_key].call(this, val, oldVal)
                );
                return val;
            },
        });
    }
}




var name = "不知名病毒";
$(function () {
	$("#confirm1").click(function () {
		window.name = $('#input1').val();
		if (name.length != 0) {
			$("#text1").html(name + "，欢迎来到这个伟大而美丽的星球！接下来你需要...")
		}
		else {
			$("#text1").html("不知名病毒，欢迎来到这个伟大而美丽的星球！接下来你需要...")
		}
		$("#myModal").modal('hide');
		$("#myModal2").modal('show');
	})
})


let wm = new watcher({
    data: {
        b: 1
    },
    watch: {
        b(newVal, oldVal) {
            console.log("old value = ", oldVal, ",new value = ", newVal);
            if (newVal >= 30 && oldVal < 30) {
                var div = document.getElementById('background');
                div.style.display = "block";
            }
        }
    }
})


//假设每隔5秒发送一次请求
window.onload = function () {
    getApi();
}
function getApi() {
    //设置时间 5-秒  1000-毫秒  这里设置你自己想要的时间 
    setTimeout(getApi, 5 * 1000);
    wm.b = wm.b + 10;
    $.ajax({
        url: '../pop_up/test.json',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            //方法中传入的参数data为后台获取的数据
            // console.log(data.data);
            var country = data['country'];

            // console.log(data1);
            $("#text_weiji").html(country + "已经将" + window.name + "病毒列为甲级传染病。")
        }
    })
}



//假设每隔5秒发送一次请求
window.onload = function () {
    getApi();
}
function getApi() {
    //设置时间 5-秒  1000-毫秒  这里设置你自己想要的时间 
    setTimeout(getApi, 20 * 1000);
    $.ajax({
        url: 'http://www.andy.com/xxx',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            //方法中传入的参数data为后台获取的数据
            // console.log(data.data);
            var data1 = data['data']['history'];
            // console.log(data1);
            var tr;
            $.each(data1, function (index, item) {
                //字符串转数组
                var code = item['code'].split(',');
                //数组转字符串：
                var strCode = code.join(' ');
                // console.log(strCode)
                tr = '<td>' + item['issue'] + '</td>' + '<td>' + strCode + '</td>' + '<td>' + item['sum'] + '</td>';
                $('#table-test').append('<tr>' + tr + '</tr>')
            })
        }
    })
}