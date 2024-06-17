import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('m_user', {
	state: () => {
		return {
			address: JSON.parse(uni.getStorageSync('address') || '{}'),
			token: uni.getStorageSync('token') || '',
			userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
			// openType, from
			redirectInfo: null
		};
	},
	actions: {
		updateAddress(address) {
			this.address = address

			this.saveAddressData()
		},
		updateUserInfo(userInfo) {
			this.userInfo = userInfo

			this.saveUserInfoData()
		},
		updateToken(token) {
			this.token = token

			this.saveTokenData()
		},
		updateRedirectInfo(info) {
			this.redirectInfo = info
		},
		saveAddressData() {
			uni.setStorageSync('address', JSON.stringify(this.address))
		},
		saveUserInfoData() {
			uni.setStorageSync('userinfo', JSON.stringify(this.userInfo))
		},
		saveTokenData() {
			uni.setStorageSync('token', JSON.stringify(this.token))
		},
		getAddress() {
			if (!this.address.provinceName) return ''

			return this.address.provinceName + this.address.cityName + this.address.countyName + this.address
				.detailInfo
		}
	},
});