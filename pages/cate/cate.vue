<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		
		<view class="scrool-view-container">
			<scroll-view class="left-scrool-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, i) in  cateList" :key="i">
					<view :class="['left-scrool-view-item', i == active ? 'active' : '']"
						@click="activeChangedHandler(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<scroll-view class="right-scrool-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-level2" v-for="(item2, i2) in cateLevel2" :key="i2">
					<view class="cate-level2-title">/ {{item2.cat_name}} /</view>

					<view class="cate-level3-list">
						<view class="cate-level3-item" v-for="(item3, i3) in item2.children" :key="i3"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{ item3.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar_badge.js'
	
	export default {
		data() {
			return {
				wh: 0,
				cateList: [],
				cateLevel2: [],
				active: 0,
				scrollTop: 0
			};
		},
		mixins: [badgeMix],
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50

			this.getCateList()
		},

		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status != 200) return uni.$showMsg()

				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			activeChangedHandler(i) {
				this.active = i

				this.cateLevel2 = this.cateList[i].children

				this.scrollTop = this.scrollTop == 0 ? 1 : 0
			},
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scrool-view-container {
		display: flex;
	}

	.left-scrool-view {
		width: 120px;

		.left-scrool-view-item {
			background-color: #F7F7F7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			position: relative;

			&.active {
				background-color: #FFFFFF;

				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}

	.cate-level2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-level3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-level3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>