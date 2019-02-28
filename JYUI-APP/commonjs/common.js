var methods = {
	/* 
	 * 数组排序  [...] // [{...},{...},{...}]
	 * array 数组
	 * type	  'desc'降序  默认升序null
	 * filter key值
	 */
    sort:function (array,type,filter){
    		if(type && typeof type !== 'undefined' && type === 'desc'){
    			if(filter && typeof filter !== undefined){
	    			array.sort(function (a,b){return b[filter] - a[filter]})
	    		}else{
	    			array.sort(function (a,b){return b - a})
	    		}   			
    		}else{
    			if(filter && typeof filter !== 'undefined'){
	    			array.sort(function (a,b){return a[filter] - b[filter]})
	    		}else{
	    			array.sort(function (a,b){return a - b})
	    		}    			
    		}
    	return array;
    },
	/*  
	 *	Date带参
	 */
    date:function (str){
        var reg = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/
        if(typeof str === 'string' && reg.test(str)){
           //首先将日期分隔 ，获取到日期部分 和 时间部分
           var day = str.split(' ');
           //获取日期部分的年月日
           var days = day[0].split(str.charAt(4));
           //获取时间部分的 时分秒
           var mi = day[day.length - 1].split(':');
           //获取当前date类型日期
           var date = new Date();
           //给date赋值  年月日
           date.setUTCFullYear(days[0], days[1] - 1, days[2]);
           //给date赋值 时分秒  首先转换utc时区 ：+8  
           if(day.length > 1){
               date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
           }    
           return date; 	 		
        }else{
            return new Date();
        }
    },
    getDate:function (fmt,str){
        var _this = this.date(str);
        var o = {
            "M+": _this.getMonth() + 1, //月份
            "d+": _this.getDate(), //日
            "h+": _this.getHours(), //小时
            "m+": _this.getMinutes(), //分
            "s+": _this.getSeconds(), //秒
            "q+": Math.floor((_this.getMonth() + 3) / 3), //季度
            "S": _this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    deltaT:function (str){
        var fourthOfJuly = this.date(str);
        var today = new Date().getTime();
        var type = fourthOfJuly - today >=0 ? 'J' : 'C';
        var diff = Math.abs(fourthOfJuly - today);
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return {type:type,days:days,hours:hours,minutes:minutes,seconds,seconds}
    },
    uniq:function (array,filter){
        if(filter && typeof array[0] == 'object'){
            var newArr = [];
            for(var i=0;i<array.length;i++){
                　　var flag = true;
                　　for(var j=0;j<newArr.length;j++){
                　　　　if(array[i][filter] == newArr[j][filter]){
                　　　　　　flag = false;
                            break;
                　　　　};
                　　}; 
                　　if(flag){
                    　　newArr.push(array[i]);
                　　};
            };
            return newArr;            
        }else{
            return array.filter(function (a,b){
                if(b === array.indexOf(a)){
                    return a;
                }
            })            
        }
    },
    cloneObj : function (obj){ 
        var str, newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj), //序列化对象
            newobj = JSON.parse(str); //还原
        } else {//如果不支持以上方法
            for(var i in obj){
                newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
            }
        }
        return newobj;
    },
	
}
