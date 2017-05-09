//接口：页面 pv，uv统计
//requestTag 按钮标记 按次序索引  页面统计可不传
function getSessionId(){  
    var c_name = 'JSESSIONID';  
    if(document.cookie.length>0){  
       var c_start=document.cookie.indexOf(c_name + "=")  
       if(c_start!=-1){   
         c_start=c_start + c_name.length+1   
         c_end=document.cookie.indexOf(";",c_start)  
         if(c_end==-1) c_end=document.cookie.length  
         return unescape(document.cookie.substring(c_start,c_end));  
       }  
    }  
}  
window.DATAVISIT = function(requestTag){
    var url = "/mhis-siapp/open/datavisit/log.do";
    var locationUrl = window.location.href;
    var params = {
        requestType: !!requestTag?2:1,
        url:locationUrl,
        requestTag: requestTag || ""
    };
    var headers = {
        token:"11233123",
        thirdToken:"",
        zoneCode:"320900",
        sessionCookie:getSessionId()
    };
    window.R.interfaceCommon("get",url,params,headers)
        .then(function(response) {

        }).catch(function(err) {
            // Error :(
        });
}
