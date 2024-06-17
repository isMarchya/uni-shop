<template>
	<view class="user-info-container">
		<view class="top">
			<image :src="userInfo.avatarUrl" class="avatar"></image>

			<view class="nickname">{{userInfo.nickName}}</view>
		</view>

		<view class="panel-list">
			<view class="panel">
				<view class="panel-body panel-body-1">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>

					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>

					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>

					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>

			<view class="panel">
				<view class="panel-title">我的订单</view>

				<view class="panel-body panel-body-2">
					<view class="panel-item">
						<image src="/static/icon1.png" class="icon"></image>
						<text>待收款</text>
					</view>

					<view class="panel-item">
						<image src="/static/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>

					<view class="panel-item">
						<image src="/static/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>

					<view class="panel-item">
						<image src="/static/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				
				<view class="panel-list-item" @click="logoutHandler">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		useUserStore
	} from '@/stores/user.js'

	export default {
		data() {
			return {
				userStore: useUserStore(),
			};
		},
		computed: {
			userInfo() {
				return this.userStore.userInfo
			},
		},
		methods: {
			async logoutHandler() {
				const res = await uni.showModal({
					title: '提升',
					content: '确认退出登录吗？'
				})
				
				if (res.errMsg == 'showModal:ok' && res.confirm){
					this.userStore.updateAddress({})
					this.userStore.updateToken('')
					this.userStore.updateUserInfo({})
				}
			}
		}
	}
</script>

<style lang="scss">
	.user-info-container {
		height: 100%;
		background-color: #f4f4f4;

		.top {
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.avatar {
				height: 90px;
				width: 90px;
				border-radius: 45px;
				border: 1px solid #fff;
				box-shadow: 0 1px 5px #000;
				margin-bottom: 10px;
			}

			.nickname {
				color: white;
				font-size: 16px;
				font-weight: bold;
			}
		}

		.panel-list {
			padding: 0 10px;
			position: relative;
			top: -10px;

			.panel {
				background-color: white;
				border-radius: 3px;
				margin-bottom: 8px;
				
				.panel-list-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 15px;
					line-height: 45px;
					padding: 0 10px;
				}

				.panel-title {
					line-height: 45px;
					padding-left: 10px;
					font-size: 15px;
					border-bottom: 2px solid #f4f4f4;
				}

				.panel-body {
					display: flex;
					justify-content: space-around;
					
					&.panel-body-1 {
						height: 50px;
					}
					
					&.panel-body-2 {
						height: 70px;
					}

					.panel-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						padding: 10 0px;
						font-size: 13px;

						.icon {
							height: 35px;
							width: 35px;
						}
					}
				}
			}
		}
	}
</style>