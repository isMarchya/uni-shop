<template>
	<view class="my-search-container" :style="{'backgroundColor': bgcolor}" @click="clickHandler">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17px"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bgcolor: {
				type: String,
				default: '#C00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			clickHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 10px;

		.my-search-box {
			height: 36px;
			width: 100%;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;

			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>