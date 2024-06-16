<template>
	<view class="cart-container" v-if="cart.length != 0">
		<my-address></my-address>
		
		<view>
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<view class="cart-title-text">购物车</view>
			</view>
		</view>

		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="rightOptions" @click="swipeItemHandler(goods)">
					<my-goods :goods="goods" :showRadio="true" :show-num="true" :check="false"
						@radioChanged="radioChangedHandler" @numChanged="numChangedHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<my-settle></my-settle>
	</view>
	
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-cart-img"></image>
		<text class="empty-cart-text">空空如也</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar_badge.js'
	import {
		useCartStore
	} from '@/stores/cart.js'

	export default {
		data() {
			return {
				cartStore: useCartStore(),
				rightOptions: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		computed: {
			cart() {
				return this.cartStore.cart
			},
			checkedNum() {
				return this.cartStore.getCheckedTotal()
			}
		},
		mixins: [badgeMix],
		methods: {
			radioChangedHandler(goods) {
				this.cartStore.updateGoodsState(goods)
			},
			numChangedHandler(goods) {
				this.cartStore.updateGoodsNum(goods)
			},
			swipeItemHandler(goods) {
				this.cartStore.delGoods(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}
	
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 14px;
		border-bottom: 2px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
	
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		
		.empty-cart-img {
			width: 90px;
			height: 90px;
			margin-bottom: 8px;
		}
		
		.empty-cart-text {
			color: gray;
			font-size: 12px;
		}
	}
</style>