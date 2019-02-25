import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/home/Home'
import Table from '@/pages/table/Table'
import Form from '@/pages/form/Form'
import SearchBook from '@/pages/searchBook/SearchBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Table',
      component: Table
    },
    {
    	path: '/form',
    	name: 'Form',
    	component: Form
    },
    {
      path: '/searchBook',
      name: 'SearchBook',
      component: SearchBook
    }
  ]
})
