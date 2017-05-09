
<template>
    <div class="content">
		<div class="header font14">
			<div class="header-tip" @doucleClick="">请在今日24:00前完成支付，逾期订单将自动取消</div>
			<div class="header-content">
				<p v-for="item in orderDetail" class="clear">
					<span class="left">{{item.name}}</span>
					<span class="right">{{item.des}}</span>
				</p>
			</div>
		</div>
		<div class="content-ct">
			<div class="font14 title">选择支付方式</div>
			<div>
				<div v-for="item in payType" class="pay-type">
					<div class="box"  @click="checkToggle(item)">
						<i class="icon" :class="item.typeIcon" style="display: inline-block;"></i>
						<div style="display: inline-block;">
							<p class="font16" style="color:#454545">{{item.typeName}}</p>
							<p class="font14" style="color:#999">{{item.typeDes}}</p>
						</div>
						<i :class="item.typeCheck" style="display: inline-block;"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<span class="font14">待支付：
				<span class="money">¥<span class="font18">{{orderPremium}}</span></span>
			</span>
			<span class="font18 btn" @click="gotoPay">支付</span>
		</div>
        <browser v-show="browserShow"></browser>
    </div>
</template>

<script>
	const common = require('../js/common.js').config;
    var Browser = require('./Browser.vue');
    module.exports={
        data:function(){
            return{
            	partnerId:"",//平台商户号
                browserShow:false,//选择浏览器页面
            	loginToken:"",//业务模块通过localStorage存储token,获取openID使用
            	payWay:6,//支付类型-支付平台接口参数
            	isWeixin:true,//微信内核判断
                flag:false,//获取支付平台接口部分入参数是否成功
            	orderId:123456,//common.getParamFromURL("orderId"),//业务模块通过URL传递平台商户系统生成的订单号，系统内唯一
            	orderPremium:common.getParamFromURL("orderPremium"),
            	orderDetail:[//业务模块通过localStorage存储订单详情供页面展示使用
            		{
            			name:"订单号",
            			des:common.getParamFromURL("orderId")
            		},
            		{
            			name:"名称",
            			des:"深圳市"
            		},
            		{
            			name:"自费金额",
            			des:"29:00"
            		}
            	],
            	payType:[//支付类型-页面展示使用
            		{
            			typeName:"微信支付",
            			typeDes:"安装微信5.0以上的版本使用",
            			typeIcon:"wx",
            			typeCheck:"check",
            			payWay:4
            		},
            		{
            			typeName:"支付宝支付",
            			typeDes:"安装支付宝5.0以上的版本使用",
            			typeIcon:"zfb",
            			typeCheck:"checked",
            			payWay:6
            		}
            	],
            	wxpaySceneInfo:[//微信H5支付场景信息-支付平台接口参数
            		{
            			"h5_info": {//IOS移动应用
            				"type":"",  //场景类型
     						"app_name":"",  //应用名
     						"bundle_id":""  //bundle_id
     					}
            		},{
            			"h5_info": {//安卓移动应用
            				"type":"",  //场景类型
     						"app_name":"",  //应用名
     						"package_name":""  //包名
     					}
            		},{
            			"h5_info": {//WAP网站应用
            				"type":"",  //场景类型
     						"wap_url":"",//WAP网站URL地址
    						"wap_name":""  //WAP 网站名
     					}
            		}
            	],
                wxp:{},
            	params:{//支付平台入参信息
					platMchId:"dd",//一账通分配的平台商户号
					nonceStr:"dd",//商户生成的随机字符串，不长于32位，主要保证签名不可预测
					signature:"dd",//签名，HMAC-SHA256签名算法
					prepayTradeNo:"1234xxx",//预支付订单号，统一收单接口返回
					payWay:this.payWay,//支付方式——4:微信支付 6：支付宝支付
					payCompTradeType:"WAP",//微信支付定义的交易类型：APP、JSAPI、MWEB, 支付宝定义的交易类型：WAP、APP
					wxpayMchId:"vv",//选择微信支付时必传。一个收单商户可能有多个微信商户号，调支付接口时必须指定本次的收款商户号，该商户号必须与appId配套，也必须支持上面传入的交易类型。
					wxpayOpenId:"vv",//微信用户标识——选择微信公众号支付时必传。
					wxpaySceneInfo:"",//微信H5支付场景信息
					deviceIP:""//终端设备等IP地址，微信下预订单时必须
				}
            }
        },
        mounted:function(){//页面加载完成钩子
        	this.init();
            //this.autoAuthorize();
        },
        methods:{
        	init:function(){//初始化
        		const self = this;
        		var us = navigator.userAgent.toLowerCase();
				self.isWeixin = (/micromessenger/.test(us)) ? true:false;
				self.getOrderDetail();
                // alert(common.getParamFromURL('code'));
        	},
            autoAuthorize: function(){//自动授权
                //尤其注意：由于授权操作安全等级较高，所以在发起授权请求时，微信会对授权链接做正则强匹配校验，如果链接的参数顺序不对，授权页面将无法正常访问
                //?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE&connect_redirect=1#wechat_redirect
                var urlTo = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE&connect_redirect=1#wechat_redirect", //微信授权跳转地址
                    appId = "wx1b865ec2477242b6",//服务号appId  wx221f8bfd8a8f402e测试用
                    code = common.getParamFromURL('code'),//用户授权之后url中自动追加的值
                    urlLocal = location.href;//当前页面地址

    			var t = urlTo.replace('APPID', appId).replace('REDIRECT_URI', encodeURIComponent(urlLocal)).replace('SCOPE', 'snsapi_userinfo');
    	        if(code == "" || void 0 === code || code == null){
    				location.href = t;//静默授权微信跳转
    			}
            },
        	gotoPay:function(){
        		const self = this;
                if(self.payWay == 6 && self.isWeixin){
                    self.browserShow = true;
                }
                if(self.payWay == 6){
                    self.gotoPayInterByBusiness();
                }else if (self.payWay == 4){
                    self.gotoPayInterByCommon();
                }

        	},
        	gotoPayInterByCommon:function(){//获取支付平台接口入参openId-公共登陆接口
        		const self = this;
        		var url = "";
        		var params = {
        			token:self.loginToken
        		}
        		var header = {};
        		window.R.interfaceCommon("post",url,params,header)
					.then(function(response) {
						response.json().then(function (data) {
							if(data.returnCode == "SUCCESS"){
								self.params.wxpayOpenId = data.wxpayOpenId;
                                self.gotoPayInterByBusiness();
							}else {
								console.log(data.returnMsg);
							}
						});
					}).catch(function(err) {
						console.log(err);
					});
        	},
        	gotoPayInterByBusiness:function(){//获取支付平台接口部分入参数-业务平台接口
        		const self = this;
        		var url = "/static/city/citymain/SIInsurance/disease/pay";
        		var params = {
        			platMchTradeNo:self.orderId,
        			resultPageUrl:window.location.href//支付宝WAP收银台支付结束后会跳转此URL
        		}
        		var header = {};
        		window.R.interfaceCommon("get",url,params,header)
					.then(function(response) {
						response.json().then(function (data) {
							if(data.returnCode == "TPA00"){
								self.params.platMchId = data.platMchId;
								self.params.nonceStr = data.nonceStr;
								self.params.signature = data.sign;
								self.params.deviceIP = data.deviceIP;
								self.params.prepayTradeNo = data.prepayTradeNo;

                                self.gotoPayInter();//发起支付接口
							}else {
								console.log(data.returnMsg);
							}
						});
					}).catch(function(err) {
						console.log(err);
					});
        	},
        	gotoPayInter:function(){//调起支付页面-支付平台接口
        		const self = this;
        		var url = "/static/city/citymain/pay/pay";
        		// const params = self.params;
				var params = self.params;
                console.log(params);
				var header = {};

				window.R.interfaceCommon("post",url,params,header)
					.then(function(response) {
						response.json().then(function (data) {
                            if(self.payWay == 6){
                                self.zfbSusFn(data);//支付宝支付成功后的业务逻辑函数
                            }else if(self.payWay == 4){
                                self.wxSusFn(data);//微信支付成功后的业务逻辑函数
                            }
						});
					}).catch(function(err) {
						console.log(err);
					});
        	},
        	checkToggle:function(item){
        		const self = this;
                for(var i = 0 ; i < self.payType.length; i++){
                    self.payType[i].typeCheck = "check";
                }
        		item.typeCheck = item.typeCheck == "check" ? "checked" : "check";
        		self.payWay = item.payWay;
        	},
        	getOrderDetail:function(){//URL获取订单详情信息
        		const self = this;
        		var orderId = common.getParamFromURL("orderId");
        		var orderDetail = localStorage.getItem("orderDetail");
        		self.orderDetail = !orderDetail ? [] : JSON.parse(orderDetail);
        		const orderIdObj = {
        			name:"订单号",
        			des:orderId
        		}
        		self.orderDetail.unshift(orderIdObj);
        	},
            zfbSusFn:function(data){
                console.log(data);
                if(data.invokeSDKinfo){
                    document.write(data.invokeSDKinfo);
                }else{
                    alert(data.returnMsg);
                }
            },
            wxSusFn:function(data){
                if(self.isWeixin){
                    //微信内置api发起微信支付
                    WeixinJSBridge.invoke("getBrandWCPayRequest", {
                        appId: body.appId,
                        timeStamp: body.timeStamp,
                        nonceStr: body.nonceStr,
                        package: body.package,
                        signType: body.signType,
                        paySign: body.paySign
                    }, function(o) {
                        if ("get_brand_wcpay_request:ok" == o.err_msg) {
                            //查询订单是否支付成功接口
                            //跳转支付成功页
                        } else if ("get_brand_wcpay_request:cancel" == o.err_msg) {
                            //errorFn && errorFn();
                        } else {
                            //errorFn && errorFn();//支付失败后的业务逻辑函数
                        }
                    });
                }else{
                    alert('请在微信内部支付');
                    return;
                }
            }
        },
        components:{
            Browser : Browser
        }

    }
</script>

<style scoped>
	.content{
		background: #F8F8F8;width: 100%;
	}
	.left{
		float: left;display: inline-block;
	}
	.right{
		float: right;
	}
	.clear:after{
		display: block;content: "";clear: both;
	}
	.content .header{
		color: #666;background: #fff;
	}
    .content .header .header-tip{
		width: 96.3%;height: 0.96rem;line-height: 0.96rem;background: #fffbdc;
		padding-left: 3.7%;
    }
    .content .header .header-content{
		padding:5px 0.3733rem;text-align: left;line-height: 0.8rem;
	}
	.content .content-ct{
		padding:0 0.3733rem;background: #fff;margin-top: 0.35rem;
	}
	.content .content-ct .title{
		width: 100%;height: 1.3333rem;line-height: 1.3333rem;color: #666;
		border-bottom: 1px solid #eee;
	}
	.content .content-ct .pay-type{
		width: 100%;height: 1.8667rem;
	}
	.content .content-ct .pay-type .box{
		position: relative;
	    top: 50%;
	    transform: translateY(-50%);
	    border-bottom: 1px solid #eee;
	}
	.content .content-ct .pay-type .box .icon{
		width: 0.6933rem;height: 0.6933rem;background: #f00;
	}
	.content .content-ct .pay-type .box .check{
		width: .56rem;height: .56rem;position: absolute;
    	right: 0;
		background:#ffffff;top: 50%;
	    transform: translateY(-50%);
		border-radius:100%;border: 1px solid #ccc;
	}
	.content .content-ct .pay-type .box .checked{
		width: .6rem;height: .6rem;position: absolute;
    	right: 0;
		background:url(../images/checkout.png) no-repeat;
		background-size: 100% 100%;
		top: 50%;
	    transform: translateY(-50%);
	}
	.content .content-ct .pay-type .box .wx{
		background: url(../images/icon-weixin.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.content .content-ct .pay-type .box .zfb{
		background: url(../images/icon-zhifubao.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.content .footer{
		width: 92.6%;height: 1.6533rem;position: absolute;bottom: 0;
		padding:0 3.7%;border: 1px solid #eee;
	}
	.content .footer .money{
		color: #ff662a;
	}
	.content .footer .btn{
		position:absolute;display: inline-block;right: 1rem;
		top: 50%;border:1px solid #eee;
	    transform: translateY(-50%);
	    background:#fc7845;
		border-radius:4px;
		width:3.067rem;
		height:1.027rem;
		text-align: center;color: #fff;line-height: 1.027rem;
	}
</style>
