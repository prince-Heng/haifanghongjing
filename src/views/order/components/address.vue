<template>
	<div class="address" >
		<div class="iconWrapper">
			<van-icon class="icon" name="contact" />
		</div>
		<div class="infoWrapper" >
			<span class="row">{{$lang['姓名']}}:{{$store.state.username}}</span>
			<span class="row">{{$lang['电话']}}：{{$store.state.storeinfo.tel}}</span>
			<span class="row">{{$lang['收货地址']}}：{{$store.state.storeinfo.address}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "item",
		components: {},
		meta: {},
		data() {
			return {
				userName:'',
				userTel:"",
				userAddress:''
			};
		},
	};
</script>

<style lang="less" scoped>
	.address {
		margin-top: 40px;
		padding: 10px;
		font-size: 12px;
		background: #fff;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		.iconWrapper {
			flex-basis: 36px;
			margin-right: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon {
				font-size: 18px;
			}
		}
		.infoWrapper {
			display: flex;
			flex-direction: column;
			line-height: 1.8em;
			flex: 1;
			.touming {
				opacity: 0;
			}
		}
	}
	.address::before {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 2px;
		background: repeating-linear-gradient(
			-45deg,
			#ff6c6c 0,
			#ff6c6c 20%,
			transparent 0,
			transparent 25%,
			#1989fa 0,
			#1989fa 45%,
			transparent 0,
			transparent 50%
		);
		background-size: 80px;
		content: "";
	}
</style>
