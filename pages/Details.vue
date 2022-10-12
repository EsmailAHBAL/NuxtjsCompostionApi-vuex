<template>

  <div class="container mt-3">

    <div class="block d-flex justify-content-centProperty 'post' does not exist on type 'Vue3Instance<{}, Readonly<ExtractPropTypes<{}>>, Readonly<ExtractPropTypes<{}>>, {}, {}, true, ComponentOptionsBase<any, any, any, any, ... 5 more ..., any>> & ... 4 more ... & Readonly<...>'.ts(2339)
   er">
    <el-card style="width: 70%;">
      <img :src="post[0].urlToImage"/>
       <el-divider></el-divider>
      <div class="block">
        <span class="tag is-primary">
        {{post[0].author}}
      </span>
      </div>
      <div class="block">
        <span class="tag is-primary">
        {{post[0].title}}
      </span>
      </div>
      <div class="block">

        {{post[0].content}}

      </div>
      <div class="block">
        <el-button type="primary" @click="toHome()">Back To Home </el-button>
      </div>
    </el-card>
   </div>
 </div>
 </template>

 <script lang="js">
 import {computed, ref, useContext, useRouter, useStore} from '@nuxtjs/composition-api'
 export default {
   name: 'IndexPage',
   async asyncData(context){
    const {title}=context.params
     const post =ref([])
     post.value = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5f8ce8e05e814e47822d05da4e46adf7`)
     .then(res=>res.json()).then(data=>{
       return data.articles.filter((item) => {
         if(item.title==title){return item}
       })
     })
     context.store.commit('GETTING_DATA',post)
     return {

     }
   },
   setup(){
    const u = useRouter()
    const s = useStore()

    const post = s.state.data

    const toHome=() => {
      u.push(`/`)
    }
    return {
          toHome,post
    }
   }

 }
 </script>
 <style>

 *{
  user-select: none;
 }
 .image {
   width: 100%;
   display: block;
 }
 </style>

