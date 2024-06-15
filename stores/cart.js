import {
	defineStore
} from 'pinia';

export const useCartStore = defineStore('m_cart', {
	state: () => {
		return {
			// goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state
			cart: JSON.parse(uni.getStorageSync('cart') || '[]')
		};
	},
	actions: {
		addToCart(goods) {
			const findRes = this.cart.find((x) => x.goods_id == goods.goods_id)
			if (!findRes) {
				this.cart.push(goods)
			}else {
				findRes.goods_count++
			}
			
			this.saveCartData()
		},
		getTotal() {
			let c = 0
			this.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		saveCartData() {
			uni.setStorageSync('cart', JSON.stringify(this.cart))
		}
	},
});