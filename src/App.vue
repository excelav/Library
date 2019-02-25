<template>
<div id="app">
	<home></home>
</div>
</template>

<script>
import Home from './pages/home/Home'
export default {
  name: 'App',
  components: {
  	Home
  }
}
</script>

<style lang="stylus">
	#app
		position: absolute
		left: 0
		top: 0
		width: 100%
		height: 100%
		// font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
</style>
