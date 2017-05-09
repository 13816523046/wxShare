
<template id="phoneCode">
    <div class="prompt-warp" v-show="promptInfos.showPrompt">
        <div class="promptInfo font16">
            {{ promptInfos.titles}}
        </div>
    </div>
</template>

<!-- js引用var BackButton = require('./BackBtn.vue');  components设置的是局部的引用 -->
<script>
    module.exports={
        data:function(){
            return{

            }
        },
        mounted:function(){//页面加载完成钩子

        },
        methods :{

        },
        props:[
            "promptInfos"
        ],
        components:{

        }

    }


</script>
<style scoped>
    .prompt-warp{
        height: 100vh;
        width: 100vw;
        z-index: 2;
        position: absolute;
        top: 0;
        background: rgba(0, 0, 0, 0.1);
        left: 0;
    }
    .promptInfo{
        width: 70vw;
        padding: 3vw 0;
        color: #fff;
        text-align: center;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 10px;
        transform: translateX(-50%) translatey(-50%);
        margin-left: 50%;
        margin-top: 90%;
    }
</style>
