<template>
	<view>
		<view class="search-box">
			<uni-search-bar @confirm="search" @input="input" cancel-button="none" :radius="100" placeholder="请输入搜索内容"
				:focus="true"></uni-search-bar>
		</view>

		<view class="search-list" v-if="searchList.length != 0">
			<view class="search-item" v-for="(item, i) in searchList" :key="i" @click="gotoSearchGood(item)">
				<view class="search-item-text">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<view class="search-history" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistoryList"></uni-icons>
			</view>

			<view class="history-lists">
				<uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoSearchList(item)" </uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchList: [],
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.kw == '') {
					this.searchList = []
					return
				}

				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch/', {
					query: this.kw
				})
				if (res.meta.status != 200) return uni.$showMsg()

				this.searchList = res.message

				this.addHistoryList()
			},
			gotoSearchGood(item) {
				uni.navigateTo({
					url: '/subpkg/good_detail/good_detail?goods_id=' + item.goods_id
				})
			},
			addHistoryList() {
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)

				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			cleanHistoryList() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			gotoSearchList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + item
				})
			}
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		background-color: #c00000;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.search-list {
		padding: 0 5px;

		.search-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 3px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.search-item-text {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.search-history {
		padding: 0 5px;

		.history-title {
			display: flex;
			height: 35px;
			font-size: 13px;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2px solid #efefef;
		}

		.history-lists {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				display: block;
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>