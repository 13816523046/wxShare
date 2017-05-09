window.R = {
	interfaceBaseUrl:'https://test-mhis-siapp.pingan.com.cn:57443',//window.location.origin,
	interfaceStgBaseUrl:'https://test-mhis-siapp.pingan.com.cn:57443',//记录1
	interfacePrdBaseUrl:'https://ehs.pingan.com.cn',//记录2
	setInterfaceBaseUrl:function(){//设置本地baseUrl
		var self = this;
		var hostname = window.location.hostname;
		if(hostname=='localhost'){
			self.interfaceBaseUrl = self.interfaceStgBaseUrl;
		}
	},
	queryParams:function(params) {//get请求拼接参数
	    return Object.keys(params)
	        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
	        .join('&');
	},
	interfaceCommon:function(type,url,params,header){//接口调用
		var self = this;
		var url = self.interfaceBaseUrl + url;
		if(type =='get') {
	        url += (url.indexOf('?') === -1 ? '?' : '&') + self.queryParams(params);
			return fetch(url, {
			    method: type,
			    headers:header
			});
	    }else{
			//header['Accept']='application/json';
			header['Content-Type']='application/json';
			//header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';

			return fetch(url, {
			    method: type,
			    headers:header,
				body:JSON.stringify(params)
			});
		}
	    // header['Content-Type']='application/json';

	}
}

window.R.setInterfaceBaseUrl();
