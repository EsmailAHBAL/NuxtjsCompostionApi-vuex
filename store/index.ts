interface IState {
   data :any;
   posts :any
}
export const state =()=>({
  data :{},posts:[]
})
export  const mutations ={
SET_POSTS:(state:IState,data:any ) =>{
  state.posts=data

},
GETTING_DATA :(state:any,data:any)=>{
state.data =data
}
}
export const getters ={
  getDate:(state:any)=>{
    return state.posts
  }
}
export  const actions = {
  INIT: (state:any,data:any)=> {

    state.data=data
  },
  GET_USER : async (context:any,title:string)=>{

    const url=`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5f8ce8e05e814e47822d05da4e46adf7`
     await fetch(url)
     .then(response =>{
       if(response.ok){
         return response.json()
       }
     })
     .then(data=>{
       if(data){
           const THEDATA = data.articles.filter((item:any)=>{
             if(item.title ==title){
               return item
             }
           })
           context.commit('GETTING_DATA',THEDATA)

       }
     })
}
}


