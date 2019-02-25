<template>
<div>
  <div>
    <el-input
      prefix-icon="el-icon-search"
      v-model="isbn"
      maxlength="13"
      placeholder="请输入13位ISBN"
      style="width: 220px; margin: 10px"
      clearable>
    </el-input>
    <el-button type="primary" icon="el-icon-search" @click="handleClickSearch">搜索</el-button>
    <el-select v-model="bookObj.position" clearable placeholder="请选择存放位置" class="position-input">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-plus" @click="handleClickAdd">收藏书籍</el-button>
  </div>
  <div class="main-content" v-show="isShow">
    <div>
      <img :src="bookObj.image" class="book-img">
    </div>
    <div class="book-desc">
      <span>书名：{{bookObj.name}}</span>
      <span>作者：{{bookObj.author}}</span>
      <span>出版社：{{bookObj.publisher}}</span>
      <span>出版时间：{{bookObj.pubdate}}</span>
      <span>页数：{{bookObj.pages}}</span>
      <span>定价：{{bookObj.price}}</span>
      <span>装帧：{{bookObj.binding}}</span>
      <span>种类：{{bookObj.type}}</span>
      <span>ISBN：{{bookObj.isbn}}</span>
      <span>摘要：{{bookObj.summary}}</span>
    </div>
  </div>
</div>
</template>

<script>
// import axios from 'axios'
import IndexedDB from '@/components/indexedDB'
import { mapActions } from 'vuex'
import jsonp from 'jsonp'
// axios.defaults.baseURL = process.env.API_ROOT
export default {
	name: 'SearchBook',
  data () {
    return {
      isbn: '',
      isShow: false,
      bookObj: {
        name: '',
        author: '',
        publisher: '',
        pubdate: '',
        pages: '',
        price: '',
        binding: '',
        image: '',
        type: '',
        isbn: '',
        summary: '',
        position: '办公室',
        date: '2019-01-29'
      },
      options: [{
        value: '办公室',
        label: '办公室'
      }, {
        value: '家',
        label: '家'
      }, {
        value: '其他',
        label: '其他'
      }]
    }
  },
  methods: {
    ...mapActions(['addData']),
    /* handleClickSearch: function () {
      if (this.isbn && this.isbn.length === 13) {
        axios.get('/' + this.isbn)
          .then(this.handleGetDateSucc)
      }
    }, */
    handleClickSearch: function () {
      if (this.isbn && this.isbn.length === 13) {
        jsonp('https://api.douban.com/v2/book/isbn/' + this.isbn, null, (err, data) => {
          if (err) {
            console.error(err.message)
          } else {
            this.handleGetDateSucc(data)
          }
        })
      }
    },
    handleGetDateSucc: function (res) {
      // if (res && res.data) {
      if (res) {
        this.isShow = true
        const data = res
        this.bookObj.name = data.title
        this.bookObj.author = data.author.join(' / ')
        this.bookObj.publisher = data.publisher
        this.bookObj.pubdate = data.pubdate
        this.bookObj.pages = data.pages
        this.bookObj.price = data.price
        this.bookObj.binding = data.binding
        this.bookObj.image = data.image
        const tagsArr = []
        for (let i = 0, len = data.tags.length; i < len; i++) {
          tagsArr.push(data.tags[i].name)
        }
        this.bookObj.type = tagsArr.join('/')
        this.bookObj.isbn = data.isbn13
        this.bookObj.summary = data.summary
      }
    },
    handleClickAdd: function () {
      if (this.isShow && this.bookObj.name) {
        let _this = this
        let bookObj = _this.bookObj
        let bookDB = null
        let storeObj = {
          name: 'books',
          key: 'id',
          indexs: ['name', 'isbn']
        }
        // 打开indexedDB数据库
        IndexedDB.openDB('wBooks', 1, bookDB, storeObj, function (db) {
          let bookDB = db
          IndexedDB.addRecord(bookDB, storeObj.name, bookObj, function (result) {
            _this.addData(result)
            _this.$message({
              message: '添加书籍成功',
              type: 'success'
            })
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .position-input
    margin-left: 80px
  .book-img
    height: 550px
    margin: 10px
    float: left
  .book-desc
    float: left
    margin: 10px
    width: 720px
    line-height: .5rem
    span
      display: block
</style>
