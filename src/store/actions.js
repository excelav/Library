export default {
	addData (context, bookObj) {
		context.commit('pushBooks', bookObj)
	},
	deleteData (context) {
		context.commit('deleteCurrentBook')
	}
}
