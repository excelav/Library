<template>
<div>
  <div>
    <el-input
      prefix-icon="el-icon-search"
      class="search"
      v-model="search"
      placeholder="输入书名进行查询"
      style="width: 300px"
      clearable>
    </el-input>
    <el-button type="warning" plain @click="deleteRecord">删除选中记录</el-button>
  </div>
  <el-table
  	class="datatable"
    :data="tables"
    border
    highlight-current-row
    max-height="565"
    @row-click="handleClick">
    <el-table-column
      prop="id"
      label="ID"
      width="70">
<!--       <template slot-scope="scope">
  <span v-html="showDate(scope.row.date)" ></span>
</template> -->
    </el-table-column>
    <el-table-column
      prop="name"
      label="书名"
      :show-overflow-tooltip="true"
      width="240">
      <template slot-scope="scope">
        <span v-html="showDate(scope.row.name)" ></span>
      </template>
    </el-table-column>
    <el-table-column
      prop="position"
      label="存放位置"
      width="160">
<!--       <template slot-scope="scope">
  <span v-html="showDate(scope.row.province)" ></span>
</template> -->
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      :show-overflow-tooltip="true"
      width="160">
<!--       <template slot-scope="scope">
  <span v-html="showDate(scope.row.city)" ></span>
</template> -->
    </el-table-column>
    <el-table-column
      prop="isbn"
      label="ISBN"
      width="130">
<!--       <template slot-scope="scope">
  <span v-html="showDate(scope.row.address)" ></span>
</template> -->
    </el-table-column>
    <el-table-column
      prop="date"
      label="入库日期"
      width="100">
<!--       <template slot-scope="scope">
  <span v-html="showDate(scope.row.zip)" ></span>
</template> -->
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注">
    </el-table-column>
    <!-- <el-table-column
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
      </template>
    </el-table-column> -->
  </el-table>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import IndexedDB from '@/components/indexedDB'
export default {
	name: 'Table',
  data () {
    return {
    	search: ''
    }
	},
	computed: {
    ...mapState(['allBooks', 'currentBook']),
    tables: function () {
      const search = this.search
      if (search) {
        return this.allBooks.filter(dataNews => {
          return String(dataNews.name).indexOf(search) > -1
	  /*  return Object.keys(dataNews).some(key => {
          	return String(dataNews[key]).toLowerCase().indexOf(search) > -1 */ 
        })
      }
      return this.allBooks
    }
  },
  methods: {
    ...mapActions(['deleteData']),
    ...mapMutations(['changeCurrentBook']),
  	handleClick (row) {
      let _this = this
      _this.changeCurrentBook(row.id)
    },
    showDate (val) {
      if (this.search !== '' && val.indexOf(this.search) !== -1) {
        return val.replace(this.search, '<font color="#409EFF">' + this.search + '</font>')
      } else {
        return val
      }
    },
    deleteRecord () {
      if (this.currentBook) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          let _this = this
          let bookDB = null
          let storeObj = {
            name: 'books',
            key: 'id',
            indexs: ['name', 'isbn'],
            id: _this.currentBook
          }
          // 打开indexedDB数据库
          IndexedDB.openDB('wBooks', 1, bookDB, storeObj, function (db) {
            let bookDB = db
            IndexedDB.deleteData(bookDB, storeObj.name, storeObj.id, function () {
              console.log('数据库中数据删除成功')
            })
          })
          _this.deleteData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-table >>> .el-table__body tr.current-row>td
    background-color: #ffd993
	.search
		margin: 10px 50px 10px 10px 
	.datatable
		width: 1100px
		margin: 0 10px 10px 10px
</style>
