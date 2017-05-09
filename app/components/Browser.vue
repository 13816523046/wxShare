
<template>
    <div class="content">
		<div class="top">
		    <img src="../images/line.png" alt="">
            <div style="clear:both;"></div>
		</div>
        <h3 class="title font14">请在菜单中选择在浏览器中打开，以完成支付</h3>
        <div class="browser-box" v-show="isIos">
            <img  class="browser-img" src="../images/ios.png" alt="">
            <h6 class="title1 font12">在Safair中打开</h6>
        </div>
        <div class="browser-box" v-show="!isIos">
            <img  class="browser-img" src="../images/andr.png" alt="">
            <h6 class="title1 font12">在浏览器中打开</h6>
        </div>
        <p class="title2 font14">完成支付后，点击这里 <a href="" class="result">查看结果</a></p>
    </div>
</template>

<script>
    var common = require('../js/common.js').config;
    module.exports={
        data:function(){
            return{
                isIos: ''

            }
        },
        mounted:function(){//页面加载完成钩子
            this.init();
            // this.autoAuthorize();
        },
        methods :{
            init:function(){
                var u = navigator.userAgent;
                if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
                    this.isIos = false;
                }else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                    this.isIos = true;
                }else {
                    this.isIos = false;
                }
            }


        },
        props:[
            "promptInfos"
        ],
        component:{

        }

    }
</script>
<style scoped>
    .content{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .top{
        padding-top: 10px;
        padding-right: 20px;
    }
    .top img{
        float: right;
    }
    .title{
        padding-top: 8px;
        padding-bottom: 25px;
        width: 100%;
        text-align: center;
    }
    .browser-box{
        width: 152px;
        height: 125px;
        background-color: #f2f2f2;
        border-radius: 100%;
        margin: 0 auto;
        padding-top: 27px;
    }
    .browser-img{
        display: block;
        width: 67px;
        height: 67px;
        margin: 0 auto;
    }
    .title1{
        width: 100%;
        text-align: center;
        margin-top: 9px;
    }
    .result{
        color: #6587d4;
    }
    .title2{
        padding-top: 50px;
        width: 100%;
        text-align: center;
    }
</style>
