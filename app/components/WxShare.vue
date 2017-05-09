
<template>
    <div class="content">
       <div class="shadown" v-show="float"></div>
       <div id="box" @click="share">分享</div>
     </div>
</template>

<script>
    module.exports={
        data:function(){
            return{
                float: false
            }
        },
        mounted:function(){//页面加载完成钩子

        },
        methods :{
            share:function(){
                this.float = true;
                this.wechatShareOverride('啦啦啦啦啦啦', 'https://test-mhis-siapp.pingan.com.cn/static/public/webapp/activity/08/index.html','描述文字啊啊啊啊');
            },
            wechatShareOverride:function(title,url,desc){
                //未加载微信资源库或从app内嵌过来不初始化分享内容
                // if (typeof wx == 'undefined') {
                //     return;
                // }

                this.wechatShareConfig();

                wx.ready(function() {
                    wx.onMenuShareTimeline({ //分享到朋友圈
                        title: title,
                        link: url,
                        imgUrl: 'http://img01.rbyair.com/20170220/9467911f-c5d0-4bf5-b43e-2cf6ce4a58ec.jpg@.webp',
                        success: function() {
        					$('.shadown').hide();
                        },
                        cancel: function() {}
                    }), wx.onMenuShareAppMessage({ //分享给朋友
                        title: title,
                        desc: desc,
                        link: url,
                        imgUrl: 'http://img01.rbyair.com/20170220/9467911f-c5d0-4bf5-b43e-2cf6ce4a58ec.jpg@.webp',
                        type: "link",
                        success: function() {
        					$('.shadown').hide();
                        },
                        cancel: function() {}
                    })
                })
            },
            wechatShareConfig:function(){


                    $.ajax({
								url: 'https://test-mhis-siapp.pingan.com.cn/static/city/member/wechat/makeWXTicket/',//接口地址获取accessToken
								timeout: 5000,
                                data:{
                                    url: location.href.substring(0,location.href.length-2)
                                },
								success: function(response) {
										console.log(response)
                                        alert('获取微信签名成功');

                                         //在调用wx.ready之前必先调用wx.config
                                         wx.config({
                                                 debug: !1,
                                                 appId: response.appid,
                                                 timestamp: response.timestamp,
                                                 nonceStr: response.nonceStr,
                                                 signature: response.signature,//生成的签名
                                                 jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
                                         }), wx.error(function() {})

								},
								error: function(jqXHR, textStatus, errorThrown) {//XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。
									console.log(jqXHR, textStatus, errorThrown)
								}
						})
            },
        },
        props:[

        ],
        components:{

        }

    }


</script>
<style scoped>
    .content{
		width: 100%;
		height: 100%;
		position: relative;
		border: 1px solid #000;
    }
    #box{
    	width: 100px;
    	height: 100px;
		font-size: 40px;
		line-height: 100px;
		margin: 100px auto 0;
		text-align: center;
		background: #678900;
    }
	.shadown{
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 22222;
		position: absolute;
		top: 0;
		left: 0;
	}

</style>
