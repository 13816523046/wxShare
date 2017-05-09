
<template>
    <div v-html="a">

    </div>
</template>

<script>
	const common = require('../js/common.js').config;
    module.exports={
        data:function(){
            return{
            	a:'<form name="punchout_form" method="post" action="https://openapi.alipaydev.com/gateway.do?charset=UTF-8&method=alipay.trade.wap.pay&sign=SN5HgQ1tmyy26RfO%2B5O%2Fu3hVTwllpLqOoE3DLUxQ84V41z8RwYzQ03WfMKNCCi6yarCpEZmWUnSigXK8YRfICfeIafUq0rjY5AIOYmhqsITv3BJnxe8I8j8ZayQCWSYGi4MTNRYBq4D0DqRQFdNwsXH6aB7Ydm8j4uqg5m0H9FMgJijV8BtwqV4bP%2BYkV6Xt0uULwOrnGN2n2l%2Ft3rXoGl8saHt2vOQ5OZvx3YruRgt7DdE0fb2SyfG8WrBMbyF2yYmFxUJqdpevkqOYjdHdurAS630LUSApKsVxipMYVKN0d3cGKlddH1bDfPHTwdVieuL%2B9kJhl6JhG%2FSRVkpaWA%3D%3D&return_url=http%3A%2F%2F127.0.0.1%2Falipay%2Freturn_url.jsp&notify_url=https%3A%2F%2Ftest-mhis-siapp.pingan.com.cn%3A57443%2Fstatic%2Fcity%2Fcitymain%2Falipay%2FupdateAlipayResult&version=1.0&app_id=2016080200148020&sign_type=RSA2&timestamp=2017-04-25+17%3A41%3A28&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json"><input type="hidden" name="biz_content" value="{&quot;body&quot;:&quot;购买测试商品0.01元&quot;,&quot;out_trade_no&quot;:&quot;2017425174127170&quot;,&quot;product_code&quot;:&quot;QUICK_WAP_PAY&quot;,&quot;subject&quot;:&quot;手机网站支付测试商品&quot;,&quot;timeout_express&quot;:&quot;2m&quot;,&quot;total_amount&quot;:&quot;0.01&quot;}"><input type="submit" value="立即支付" style="display:none" ></form>',
                b:'<form name="punchout_form" method="post" action="https://openapi.alipaydev.com/gateway.do?charset=UTF-8&method=alipay.trade.wap.pay&sign=SN5HgQ1tmyy26RfO%2B5O%2Fu3hVTwllpLqOoE3DLUxQ84V41z8RwYzQ03WfMKNCCi6yarCpEZmWUnSigXK8YRfICfeIafUq0rjY5AIOYmhqsITv3BJnxe8I8j8ZayQCWSYGi4MTNRYBq4D0DqRQFdNwsXH6aB7Ydm8j4uqg5m0H9FMgJijV8BtwqV4bP%2BYkV6Xt0uULwOrnGN2n2l%2Ft3rXoGl8saHt2vOQ5OZvx3YruRgt7DdE0fb2SyfG8WrBMbyF2yYmFxUJqdpevkqOYjdHdurAS630LUSApKsVxipMYVKN0d3cGKlddH1bDfPHTwdVieuL%2B9kJhl6JhG%2FSRVkpaWA%3D%3D&return_url=http%3A%2F%2F127.0.0.1%2Falipay%2Freturn_url.jsp&notify_url=https%3A%2F%2Ftest-mhis-siapp.pingan.com.cn%3A57443%2Fstatic%2Fcity%2Fcitymain%2Falipay%2FupdateAlipayResult&version=1.0&app_id=2016080200148020&sign_type=RSA2&timestamp=2017-04-25+17%3A41%3A28&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json"><input type="hidden" name="biz_content" value="{&quot;body&quot;:&quot;购买测试商品0.01元&quot;,&quot;out_trade_no&quot;:&quot;2017425174127170&quot;,&quot;product_code&quot;:&quot;QUICK_WAP_PAY&quot;,&quot;subject&quot;:&quot;手机网站支付测试商品&quot;,&quot;timeout_express&quot;:&quot;2m&quot;,&quot;total_amount&quot;:&quot;0.01&quot;}"><input type="submit" value="立即支付" style="display:none" ></form>'
            }
        },
        mounted:function(){//页面加载完成钩子
        	document.forms[0].submit();
        },
        methods :{
        	init:function(){
                // var zfbForm = localStorage.getItem("ZFBFORM");
                // this.a = zfbForm.substring(0,zfbForm.indexOf("<script>"));
            }
        },
        component:{

        }

    }
</script>

<style scoped>

</style>
