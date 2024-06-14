<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading: false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''

			this.getGoodsList()
		},
		onReachBottom() {
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg("没有更多商品了！")
			
			if (this.isLoading) return
			
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			
			this.getGoodsList(() => {uni.stopPullDownRefresh()})
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status != 200) return uni.$showMsg()
				this.isLoading = false
				
				cb && cb()
				console.log(res.message)
				this.total = res.message.total
				this.goodsList = [...this.goodsList, ...res.message.goods]
			},
			gotoDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>