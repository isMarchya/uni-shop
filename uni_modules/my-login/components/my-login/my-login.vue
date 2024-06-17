<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>

		<button type="warn" class="login-btn" @click="getUserProfile">一键登录</button>

		<view class="login-tips-text">登录后尽享更多权益</view>
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
		methods: {
			async getUserProfile() {
				await uni.getUserProfile({
					desc: '用于完善用户资料',
					success: (succRes) => {
						this.userStore.updateUserInfo(succRes.userInfo)

						this.getToken(succRes)
					},
					fail: (failRes) => {
						if (failRes.errMsg == 'getUserProfile:fail auth deny') return uni.$showMsg(
							'你取消了登录授权！')
					}
				})
			},
			async getToken(userLoginInfo) {
				let _this = this
				await uni.login({
					fail: () => {
						return uni.$showMsg('登录失败')
					},
					async success(succRes) {
						const query = {
							code: succRes.code,
							encryptedData: userLoginInfo.encryptedData,
							iv: userLoginInfo.iv,
							rawData: userLoginInfo.rawData,
							signature: userLoginInfo.signature
						}

						const loginRes = await uni.$http.post('/api/public/v1/users/wxlogin', query)
						_this.userStore.updateToken(
							'Bearer eyJhbGciOiJIUzINiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiQjE1NjQ3MzAwNzkslmV4CI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
						)
						uni.$showMsg('登录成功！')
						if(_this.userStore.redirectInfo && _this.userStore.redirectInfo.openType == 'switchTab') {
							uni.switchTab({
								url: _this.userStore.redirectInfo.from,
								complete: () => {
									_this.userStore.updateRedirectInfo(null)
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #F8F8F8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;

		&::after {
			content: ' ';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}
	}

	.login-btn {
		width: 90%;
		margin: 15px 0;
		border-radius: 100px;
		background-color: #c00000;
	}

	.login-tips-text {
		font-size: 12px;
		color: gray;
	}
</style>