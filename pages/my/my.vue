<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		
		<my-user-info v-else></my-user-info>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar_badge.js'
	import {useUserStore} from '@/stores/user.js'
	
	export default {
		data() {
			return {
				userStore: useUserStore()
			};
		},
		mixins: [badgeMix],
		computed: {
			token() {
				return this.userStore.token
			}
		}
	}
</script>

<style lang="scss">
page, .my-container {
	height: 100%;
}
</style>
