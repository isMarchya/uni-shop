import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('m_user', {
	state: () => {
		return {
			address: JSON.parse(uni.getStorageSync('address') || '{}')
		};
	},
	actions: {
		updateAddress(address) {
			this.address = address
			
			this.saveAddressData()
		},
		saveAddressData() {
			uni.setStorageSync('address', JSON.stringify(this.address))
		},
		getAddress() {
			if (!this.address.provinceName) return ''
			
			return this.address.provinceName+this.address.cityName+this.address.countyName+this.address.detailInfo
		}
	},
});