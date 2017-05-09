<template>
	<div class="shadow"><!--连接失败-->
		<div class="lianjieshibai">
			<div class="lianjie-top font36">
				<span>网络连接异常，请稍后再试</span>
			</div>
			<div @click="setShow" class="lianjie-btm font36">
				<span>确认</span>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props:[
			'setShow'//设置父组件属性
		],
	}
</script>
<style scoped>
.shadow{
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.4);
	z-index: 201;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.shadow .lianjieshibai{
	display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #ffffff;
    align-items: center;
    width: 82%;
}
.shadow .lianjieshibai .lianjie-top{
	display: flex;
    justify-content: center;
    align-items: center;
    color: #492a7d;
    padding: 8% 0;
}
.shadow .lianjieshibai .lianjie-btm{
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffa63f;
	padding: 4% 0;
	border-top: 1px solid #e5e5e5;
    width: 100%;
}
</style>
