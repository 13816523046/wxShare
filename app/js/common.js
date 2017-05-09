var activitiesToPromoteCommon = {};
activitiesToPromoteCommon.setRemByScreen = function(){//设置rem基础值，宽度的十分之一
	var doc = window.document;
	var docE = doc.documentElement;
	var tid;

	function refreshRem(){
		var width = docE.getBoundingClientRect().width;
		if(width > 540){ //最大宽度
			width = 540;
		}
		var rem = width / 10;//将屏幕宽度分成10份，1份为1rem
		docE.style.fontSize = rem + 'px';
	}
	window.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();
};
activitiesToPromoteCommon.setRemByScreen();

// var setStoragetime = localStorage.getItem("STORAGETIME");
// var currentTime = (new Date()).getTime();
// var time = currentTime - setStoragetime;
// if (time > 600000) {
//     localStorage.removeItem("BURIEDPOINT");//清除登录信息
// }

const common = {
	getParamFromURL:function(name){//获取具体参数，通过URL
        var url = window.location.href;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
  	}
}

exports.config = common;
