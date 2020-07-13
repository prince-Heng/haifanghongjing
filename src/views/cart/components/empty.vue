<template>
	<div class="empty">
		<img src="@/assets/images/noCart.png" />
        <slot></slot>
		<router-link to="/" class="goHome">{{$lang['再去逛逛']}}</router-link>
	</div>
</template>

<script>
    export default {
        name: "empty",
        data() {
            return {};
        }
    };
</script>

<style lang="less" scoped>
    .empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            width: 50%;
            margin: 100px auto 0;
        }
         span{
                text-align: center;
            }
        .title {
            text-align: center;
            padding: 0.5rem;
            font-size: 14px;
        }
        .goHome {
            color: #fff;
            background-color: red;
            text-align: center;
            margin: 40px auto 0;
            padding: 10px;
            width: 200px;
            height: 16px;
            line-height: 16px;
            border-radius: 1rem;
            font-size: 14px;
           
        }
    }
</style>