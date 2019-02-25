<template>
<el-container>
  <el-header height="50px">
  	<home-header></home-header>
  </el-header>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246); overflow: hidden">
    	<home-nav-menu></home-nav-menu>
    </el-aside>
    <el-main>
      <keep-alive :include="['Table', 'SearchBook']">
    	 <router-view/>
      </keep-alive>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import HomeHeader from './components/HomeHeader'
import HomeNavMenu from './components/NavMenu'
import IndexedDB from '@/components/indexedDB'
import { mapActions } from 'vuex'
export default {
	name: 'Home',
	components: {
		HomeHeader,
		HomeNavMenu
	},
  methods: {
    ...mapActions(['addData'])
  },
	created () {
    let _this = this
		let bookDB = null
		let storeObj = {
			name: 'books',
			key: 'id',
			indexs: ['name', 'isbn']
		}
		// 打开indexedDB数据库
		IndexedDB.openDB('wBooks', 1, bookDB, storeObj, function (db) {
    	let bookDB = db
    	IndexedDB.tranverseDataByCursor(bookDB, storeObj.name, function (result) {
    		// _this.$store.dispatch('addData', result.value)
        _this.addData(result.value)
    	})
    })
	}
}
</script>
<style lang="stylus" scoped>
  .el-header
    background-color: #1c2438
  .el-aside
    background-color: #D3DCE6
    color: #333
    position: fixed
    top: 50px
    left: 0
    height: 100%
  .el-main
    background-color: #E9EEF3
    color: #333
    position: fixed
    top: 50px
    left: 200px
    min-height: 100%
    width: 100%
    padding: 0
</style>
