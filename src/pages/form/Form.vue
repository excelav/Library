<template>
<div class="resource">
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	  <el-form-item label="书籍名称" prop="name">
	    <el-input v-model="ruleForm.name"></el-input>
	  </el-form-item>
	  <el-form-item label="存放位置" prop="position">
	    <el-radio-group v-model="ruleForm.position">
	      <el-radio label="办公室"></el-radio>
	      <el-radio label="家"></el-radio>
	      <el-radio label="其他"></el-radio>
	    </el-radio-group>
	  </el-form-item>
	  <el-form-item label="书籍类别" prop="type">
	    <el-radio-group v-model="ruleForm.type">
	      <el-radio label="文学" name="type"></el-radio>
	      <el-radio label="绘本" name="type"></el-radio>
	      <el-radio label="其他" name="type"></el-radio>
	    </el-radio-group>
	  </el-form-item>
	  <el-form-item label="ISBN" prop="isbn">
		  <el-input v-model.number="ruleForm.isbn" autocomplete="off" placeholder="13位数字"></el-input>
	  </el-form-item>
	  <el-form-item label="入库日期" prop="date">
			<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
			</el-date-picker>
  	</el-form-item>
	  <el-form-item label="备注" prop="remarks">
	    <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="submitForm">新增书籍</el-button>
	    <el-button @click="resetForm('ruleForm')">重置</el-button>
	  </el-form-item>
	</el-form>
</div>
</template>

<script>
import IndexedDB from '@/components/indexedDB'
import { mapActions } from 'vuex'
export default {
  name: 'Form',
  data () {
	  return {
	    ruleForm: {
        name: '',
        position: '办公室',
        type: '文学',
        isbn: '',
        date: '',
        remarks: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请选择存放位置', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        date: [
          { type: 'string', message: '请选择时间', trigger: 'change' }
        ]
      }
	  }
	},
	mounted: function () {
		const time = new Date()
		this.ruleForm.date = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
	},
	methods: {
		...mapActions(['addData']),
	  submitForm () {
	  	this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
        	let _this = this
        	let bookObj = _this.ruleForm
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
    	})
	  },
	  resetForm (formName) {
      this.$refs[formName].resetFields()
    }
	}
}
</script>
<style lang="stylus" scoped>
	.resource
		margin: 10px
		.el-form
			width: 600px
			padding: 24px
			box-sizing: border-box
			border: 1px solid #409EFF
			border-radius: 5px
			box-shadow: 0 0 5px #409eff
			background-color: #fff
</style>
