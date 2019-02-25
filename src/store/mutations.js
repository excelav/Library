export default {
	pushBooks (state, bookObj) {
		state.allBooks.push(bookObj)
	},
	changeCurrentBook (state, bookObj) {
		state.currentBook = bookObj
	},
	deleteCurrentBook (state) {
		const oldBook = state.currentBook
		let BookArrayIndex
		state.currentBook = ''
		for (let i = 0, len = state.allBooks.length; i < len; i++) {
			if (state.allBooks[i].id === oldBook) {
				BookArrayIndex = i
				break
			}
		}
		if (BookArrayIndex >= 0) {
			state.allBooks.splice(BookArrayIndex, 1)
		}
	}
}
