<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClick"></radio>
			<image class="goods-pic" :src="goods.goods_small_logo || defaultPic"></image>
		</view>

		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info">
				<view class="goods-price">{{Number(goods.goods_price).toFixed(2)}}</view>

				<uni-number-box class="goods-number" :min="1" :value="goods.goods_count" v-if="showNum" @change="numChange"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods: {
			radioClick() {
				this.$emit('radioChanged', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numChange(value) {
				this.$emit('numChanged', {
					goods_id: this.goods.goods_id,
					goods_count: +value,
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 2px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-right: 20px;

				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>