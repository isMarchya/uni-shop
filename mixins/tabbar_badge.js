import {
	useCartStore
} from '@/stores/cart.js'

export default {
	computed: {
		cartTotal() {
			return useCartStore().getTotal()
		}
	},
	watch: {
		cartTotal() {
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.cartTotal + ''
			})
		}
	}
}