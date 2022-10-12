<template>

<section>
  <div class="columns is-multiline" >
    <div class="column is-4" v-for="a in visiblePOST" :key="a.id" >
      <el-card >
        <div class="block">
          <img
          :src="a.urlToImage"
          class="image"
        />
        </div>
        <div class="block">
           <span class="tag is-primary">
            <p style="position: relative;">{{a.author}}</p>
           </span>
           <div class="block mt-4" >
            <el-divider><span class="tag is-info">
              Title
            </span></el-divider>
            <div class="block">
              {{a.title}}
            </div>
            <el-divider><span class="tag is-info">
              Content
            </span></el-divider>
            <div class="content">
              {{a.content}}
            </div>
            <el-divider></el-divider>
            <div class="block">
              <button class="button is-primary" @click="toPost(a.title)">Read More</button>
            </div>
           </div>
        </div>
      </el-card>
    </div>
  </div>
  <el-divider>----</el-divider>
  <div class="container" style="padding-bottom: 40px;">

    <div class="block mt-2">
    <div style="display: flex;justify-content: center;">
      <el-button type="primary" @click="more()" v-if="getMore">More Posts</el-button>

    </div>
      <div class="content" style="display: flex;justify-content: space-around;">
        <h5>Number of Posts</h5>
        <span class="tag is-primary">{{visiblePOST.length}}</span>
      </div>
    </div>
  </div>
</section>
</template>

<script lang="js">
import {reactive, computed, useRouter,toRefs, useStore} from '@nuxtjs/composition-api'
import { data } from 'browserslist'
import { createInstance } from 'localforage'
export default {
  name: 'IndexPage',
  async asyncData(context){
    const post = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5f8ce8e05e814e47822d05da4e46adf7`)
    .then(res=>res.json()).then(data=>data.articles)
    context.store.commit('SET_POSTS',post)

  },
  setup(ctx){
    const store = useStore()
    console.log(store.state.posts);

    const r = useRouter()
    const data =reactive({
      post :computed(() => {
        return JSON.parse(JSON.stringify(store.state.posts))

      }),
      visiblePOST:[],
      end:8 ,
      total:0,
      getMore:true
    })
    data.total=data.post.length
     data.visiblePOST=data.post.splice(0,4)
    console.log(data.visiblePOST);

    const more =() => {
      if(data.visiblePOST.length<96){
        data.end = data.end + 4
        data.visiblePOST = data.post.slice(0,data.end)
        console.log(data.visiblePOST);
      }
else{      data.getMore=false
}

        // console.log(data.visiblePOST.length);
        // data.end = data.end +10
      }
      const toPost =(title) => {
      r.push(`article/${title}`)
      }
    return{
      toPost,...toRefs(data),more
    }
  }
}
</script>
<style>


.image {
  width: 100%;
  display: block;
}
</style>
