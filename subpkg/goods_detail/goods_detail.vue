<template>
	<view v-if="goodsInfo.goods_name" class="goods-detail-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goodsInfo.pics" :key="i">
				<image :src="item.pics_big_url" @click="preview(i)"></image>
			</swiper-item>
		</swiper>

		<view class="goods-info-box">
			<view class="goods-price">¥{{goodsInfo.goods_price}}</view>

			<view class="goods-info">
				<view class="goods-title">{{goodsInfo.goods_name}}</view>

				<view class="goods-collect">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>

			<view class="goods-express">快递: 免运费</view>
		</view>

		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>

		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="clickIcon"
				@buttonClick="clickButton"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import {
		useCartStore
	} from '@/stores/cart.js'

	export default {
		data() {
			return {
				cartStore: useCartStore(),
				goodsInfo: {},
				options: [{
						icon: 'shop',
						text: '店铺'
					},
					{
						icon: 'cart',
						text: '购物车',
						info: 0
					}
				],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			const goodsID = options.goods_id
			this.getGoodsInfo(goodsID)
		},
		computed: {
			cartTotal() {
				return this.cartStore.getTotal()
			}
		},
		watch: {
			cartTotal: {
				handler(newVal) {
					const res = this.options.find((x) => x.text == '购物车')
					if (res) res.info = newVal
				},
				immediate: true
			}
		},
		methods: {
			async getGoodsInfo(goodsID) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: goodsID
				})
				if (res.meta.status != 200) return uni.$showMsg()

				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/.webp/g, '.jpg')
				this.goodsInfo = res.message
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsInfo.pics.map(x => x.pics_big_url)
				})
			},
			clickIcon(e) {
				if (e.content.text == '购物车') {
					return uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			clickButton(e) {
				if (e.content.text == '加入购物车') {

					const goods = {
						goods_id: this.goodsInfo.goods_id,
						goods_name: this.goodsInfo.goods_name,
						goods_price: this.goodsInfo.goods_price,
						goods_count: 1,
						goods_small_logo: this.goodsInfo.goods_small_logo,
						goods_state: true
					}

					this.cartStore.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0px;

		.goods-price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0px;
		}

		.goods-info {
			display: flex;
			justify-content: space-between;

			.goods-title {
				font-size: 13px;
				margin-right: 10px;
			}

			.goods-collect {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 2px solid #efefef;
				color: gray;
			}
		}

		.goods-express {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 999;
	}

	.goods-detail-container {
		padding-bottom: 50px;
	}
</style>