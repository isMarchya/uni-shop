<template>
	<view>
		<view class="search-container">
			<my-search @click="gotoSearch"></my-search>
		</view>
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
				<image class="nav-image" :src="item.image_src"></image>
			</view>
		</view>

		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>

				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].new_url">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list.slice(1)" :key="i2"
							:url="item2.new_url">
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar_badge.js'
	
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			}
		},
		mixins: [badgeMix],
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata');
				if (res.meta.status != 200) return uni.$showMsg()

				this.swiperList = res.message
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status != 200) return uni.$showMsg()

				this.navList = res.message
			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status != 200) return $showMsg()

				res.message.forEach(floor => {
					floor.product_list.forEach(product => {
						product.new_url = '/subpkg/goods_list/goods_list?' + product.navigator_url
							.split('?')[1]
					})
				})
			
				this.floorList = res.message
			},
			navClickHandler(item) {
				if (item.name == '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style>
	swiper {
		height: 330rpx;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
	}

	.swiper-item image {
		width: 100%;
		height: 100%;
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
	}

	.nav-image {
		width: 128rpx;
		height: 140rpx;
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-img-box {
		padding-left: 10rpx;
		display: flex;
	}
	
	.search-container {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>