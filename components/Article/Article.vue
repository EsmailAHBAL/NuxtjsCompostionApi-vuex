<template>

 <div class="cont">
  {{post}}
</div>
</template>

<script lang="ts">
import {ref, useRouter} from '@nuxtjs/composition-api'
export default {
  name: 'IndexPage',
  async asyncData(context:any){
    const post = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5f8ce8e05e814e47822d05da4e46adf7`).then(res=>res.json()).then(data=>data.articles)
    return {
      post
    }
  },


}
</script>
<style>


.image {
  width: 100%;
  display: block;
}
</style>

