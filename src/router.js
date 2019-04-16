import Vue from 'vue'
import Router from 'vue-router'
import MusicHall from './views/MusicHall.vue'
import SongList from './views/SongList.vue'
import song from './views/Song.vue'
import Album from './views/Album.vue'

Vue.use(Router)

export default new Router( {
routes:[
  {path:'/', name: 'musichall', component:MusicHall},
  {path:'/mine',name: 'mine',component:resolve => require(['./views/Mine.vue'], resolve)},
  {path:'/find', name: 'find', component:resolve => require(['./views/Find.vue'], resolve)},
  {path:'/songlist', name: 'songlist', component:SongList},  
  {path:'/song', name: 'song', component:song},
  {path:'/album', name: 'album',component:Album}
], 
linkActiveClass:'active'
})
