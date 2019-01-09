import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Redirect from './views/Redirect.vue'
// import Login from './views/Login.vue'
import Talkbox from './views/Talkbox.vue'
import Home from './components/mainPage/Home.vue'
import Chat from './components/mainPage/Chat.vue'
import Explorer from './components/mainPage/Explorer.vue'
import PkkLogin from './components/talkBoxPage/Login.vue'
import Board from './components/talkBoxPage/Board.vue'
import Post from './components/talkBoxPage/Post.vue'
import MailPost from './components/talkBoxPage/MailPost.vue'
import Articles from './components/talkBoxPage/Articles.vue'
import Profile from './components/talkBoxPage/Profile.vue'
import Article from './components/talkBoxPage/articlesPage/Article.vue'
import Mailbox from './components/talkBoxPage/mailPage/Mailbox.vue'
import Mail from './components/talkBoxPage/mailPage/Mail.vue'
import Reply from './components/talkBoxPage/Reply.vue'
// import * as Cookies from "js-cookie"
import store from './store.js'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/chat', component: Chat },
        { path: '/explorer', component: Explorer },
      ]
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: Redirect
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    {
      path: '/',
      name: 'talk',
      component: Talkbox,
      redirect: '/board',
      children: [
        { path: '/board', component: Board },
        { path: '/login', component: PkkLogin },
        { path: '/post', component: Post },
        { path: '/mail/:id', component: MailPost },
        { path: '/mailbox', component: Mailbox },
        { path: '/mailbox/:id', component: Mail },
        { path: '/articles', component: Articles },
        { path: '/profile/:id', component: Profile },
        { path: '/articles/:id', component: Article },
        { path: '/reply/:id', component: Reply }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // let token = Cookies.get('token')
  // store.commit('SET_TOKEN', token)
  if (store.state.token != "123") {
    next()
  } else {
    if (to.path != '/login' && to.path != '/redirect') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router