<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<image class="goods-pic" :src="goods.goods_small_logo || defaultPic"></image>
		</view>

		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info">
				<view class="goods-price">{{Number(goods.goods_price).toFixed(2)}}</view>
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
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 2px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;

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
				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>