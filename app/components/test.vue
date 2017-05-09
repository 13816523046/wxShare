
<template>
    <div>
		{{currentDates}}
		<div class="font18" v-for="items in weekArrays">
			<span @click="updateshangmen(item)" style="border:1px solid #ccc" v-for="item in items">{{item.date}}</span>
		</div >
		<div class="menu">
			{{title}}
			<div class="btn" @click="selectmenu">随机选择</div>
			<div  v-for="menu in menuType">
				<label :for="menu.value"><input type="radio" :id="menu.value" name="classify" :value="menu.value" class="btn" v-model="requestType">{{menu.name}}</label>
			</div>
			{{menuResult}}
		</div>
    </div>
</template>

<script>
	//简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。
	const common = require('../js/common.js').config;
    module.exports={
        data:function(){
            return{
            	title:"吃啥",
            	menuType:[{name:"家常",value:1},{name:"小资",value:2}],
            	requestType:1,
            	menuJia:["金饭碗","炒米粉","烩面","秦记","东北饺子","蒸菜馆"],
            	menuXiao:["精悦榕","麻香辣爽","辣妹","火锅"],
            	menuResult:"烩面",
            	currentDates:"111",
            	weekArrays:[
					[{date:"周一"},{date:"周二"},{date:"周三"},{date:"周四"},{date:"周五"},{date:"周六"},{date:"周日"}],
					[{date:"周一"},{date:"周二"},{date:"周三"},{date:"周四"},{date:"周五"},{date:"周六"},{date:"周日"}],
					[{date:"周一"},{date:"周二"},{date:"周三"},{date:"周四"},{date:"周五"},{date:"周六"},{date:"周日"}],
					[{date:"周一"},{date:"周二"},{date:"周三"},{date:"周四"},{date:"周五"},{date:"周六"},{date:"周日"}],
					[{date:"周一"},{date:"周二"},{date:"周三"},{date:"周四"},{date:"周五"},{date:"周六"},{date:"周日"}],
				],
				shangmenDate:['5-1','5-2','4-28','5-7']
            }
        },
        mounted:function(){//页面加载完成钩子
        	this.init();
        },
        methods :{
        	init:function(){
        		const self = this;
				self.currentDates = new Date();
				self.updateWeekArrays();
            },
            isInArr:(str,arr)=>{//元素在数组中
            	for (var i = arr.length - 1; i >= 0; i--) {
            		if(arr[i] == str){
            			return true;
            		}
            	}
            },
            getMonDayCurrent:()=>{//获取最近的星期一日期
            	let currentDates = new Date();
				let currentDate = currentDates.getDate();
				let currentDay = currentDates.getDay();
				currentDates.setDate(currentDate -  (currentDay - 1) );
				return currentDates;
            },
            getDateStr:function(AddDayCount) {//获取几天后的时间 
            	const self = this;
			    let dd = self.getMonDayCurrent(); 
		        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
		        let y = dd.getFullYear(); 
		        let m = dd.getMonth()+1;//获取当前月份的日期
		        let d = dd.getDate(); 
		        let str = m+"-"+d;
		        if(self.isInArr(str,self.shangmenDate)){
		        	if(d == 1){
		        		return m+"-"+d+"-上门";
		        	}else{
		        		return d + "-上门";
		        	}
		        }else{
		        	if(d == 1){
			        	return m+"-"+d;
			        }else{
			        	return d;
			        }
		        }
			},
			updateWeekArrays:function(){//更新日期
				const self = this;
				const weekArrays = self.weekArrays;
				let k = 0;
				for (let i = 1;  i <= weekArrays.length - 1; i++) {
					for(let j = 0;j<=weekArrays[i].length -1;j++ ,k++){
						weekArrays[i][j].date = self.getDateStr(k);
					}
				}
			},
			updateshangmen:(item)=>{//上门点击事件
				let mask = item.date.toString().indexOf("上门");
				item.date = mask > 0 ?item.date.substring(0,mask-1):item.date+"-上门";
			},
			selectmenu:function(){//选菜
				const self = this;
				const menu = self.requestType == 1 ? self.menuJia : self.menuXiao;
				self.menuResult = menu[Math.floor(Math.random()*menu.length)];
			}
        },
        component:{

        }

    }
</script>

<style scoped>
.menu{
	border: 1px solid #eee;
	background: #ccc;
}
.menu .btn{
	background: #f00;
}
</style>
