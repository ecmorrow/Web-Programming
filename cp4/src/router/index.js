
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Swipe from '@/components/Swipe'
import Matches from '@/components/Matches'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Swipe',
      component: Swipe
    },
    {
    	path: '/matches',
    	name: 'Matches',
    	component: Matches
    }
  ]
})
