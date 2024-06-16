<template>
	<view class="settle-container">
		<label class="settle-radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullCheck" />
			<text>全选</text>
		</label>

		<view class="settle-amount-box">
			合计<text class="settle-amount-text">¥{{amount}}</text>
		</view>

		<view class="settle-btn">结算({{checkedNum}})</view>
	</view>
</template>

<script>
	import {
		useCartStore
	} from '@/stores/cart.js'

	export default {
		data() {
			return {
				cartStore: useCartStore()
			};
		},
		computed: {
			checkedNum() {
				return this.cartStore.getCheckedTotal()
			},
			isFullCheck() {
				return this.cartStore.getCheckedTotal() == this.cartStore.getTotal()
			},
			amount() {
				return this.cartStore.getAmount()
			}
		},
		methods: {
			changeAllState() {
				this.cartStore.updatAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
	.settle-container {
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 999;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		background-color: white;
		padding-left: 5px;
	}

	.settle-radio {
		display: flex;
		align-items: center;
	}

	.settle-amount-box {
		.settle-amount-text {
			color: #c00000;
			font-weight: bold;
		}
	}

	.settle-btn {
		height: 50px;
		background-color: #c00000;
		line-height: 50px;
		padding: 0 10px;
		color: white;
		min-width: 100px;
		text-align: center;
	}
</style>