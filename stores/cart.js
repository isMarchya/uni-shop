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
			} else {
				findRes.goods_count++
			}

			this.saveCartData()
		},
		updateGoodsState(goods) {
			const findRes = this.cart.find((x) => x.goods_id == goods.goods_id)
			if (findRes) {
				findRes.goods_state = goods.goods_state
				
				this.saveCartData()
			}
		},
		updateGoodsNum(goods) {
			const findRes = this.cart.find((x) => x.goods_id == goods.goods_id)
			if (findRes) {
				findRes.goods_count = goods.goods_count
				
				this.saveCartData()
			}
		},
		delGoods(goods_id) {
			this.cart = this.cart.filter((x) => x.goods_id != goods_id)
			
			this.saveCartData()
		},
		updatAllGoodsState(newState) {
			this.cart.forEach(x => x.goods_state = newState)
			
			this.saveCartData()
		},
		getTotal() {
			let c = 0
			this.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		getCheckedTotal() {
			return this.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		getAmount(){
			return this.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_price * item.goods_count, 0).toFixed(2)
		},
		saveCartData() {
			uni.setStorageSync('cart', JSON.stringify(this.cart))
		}
	},
});