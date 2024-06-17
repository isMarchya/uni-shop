<template>
	<view class="settle-container">
		<label class="settle-radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFull" />
			<text>全选</text>
		</label>

		<view class="settle-amount-box">
			合计<text class="settle-amount-text">¥{{amount}}</text>
		</view>

		<view class="settle-btn" @click="settleHandler">结算({{checkedNum}})</view>
	</view>
</template>

<script>
	import {
		useCartStore
	} from '@/stores/cart.js'
	import {
		useUserStore
	} from '@/stores/user.js'

	export default {
		data() {
			return {
				cartStore: useCartStore(),
				userStore: useUserStore(),
				seconds: 3,
				timer: null
			};
		},
		computed: {
			checkedNum() {
				return this.cartStore.getCheckedTotal()
			},
			isFull() {
				return this.cartStore.getCheckedTotal() == this.cartStore.getTotal()
			},
			amount() {
				return this.cartStore.getAmount()
			},
			address() {
				return this.userStore.getAddress()
			},
			token() {
				return this.userStore.token
			}
		},
		methods: {
			changeAllState() {
				this.cartStore.updatAllGoodsState(!this.isFull)
			},
			settleHandler() {
				if (!this.checkedNum) return uni.$showMsg('请选择要结算的商品！')

				if (!this.address) return uni.$showMsg('请选择收货地址！')

				if (!this.token) {
					this.seconds = 3
					this.delayNav(this.seconds)
				}

				this.orderPay()
			},
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算! ' + n + '秒后自动跳转到结算页',
					mask: true,
					duration: 1500
				})
			},
			delayNav(n) {
				this.showTips(n)

				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)

						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.userStore.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})

						return
					}

					this.showTips(this.seconds)
				}, 1000)
			},
			async orderPay() {
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addr,
					goods: this.cartStore.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price,
					}))
				}

				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				// if (res.meta.status != 200) return uni.$showMsg('创建订单失败！')
				// const orderNumber = res.message.order_number
				const orderNumber = 'xxxx22222222'

				const {
					data: res2
				} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: orderNumber
				})
				// if (res2.meta.status != 200) return uni.$showMsg('预付订单生成失败！')
				// const payInfo = res2.message.pay
				const payInfo = {}
				
				uni.requestPayment({
					orderInfo: payInfo,
					fail: () => {
						uni.$showMsg('支付失败！')
					},
					success: () => {
						uni.$showMsg('支付成功')
					}
				})
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