import { createStore } from "vuex"
import axios from "axios";

const store = createStore({
    state(){
        return{
            likes : 30,
            좋아요눌렀니 : false,
            more : {},
        }
    },

    mutations :{
        setMore(state,data){
            state.more = data
        },
        좋아요(state){
            if(state.좋아요눌렀니 == false){
                state.likes++;
                state.좋아요눌렀니 == true;
            } else {
                state.likes--;
                state.좋아요눌렀니 == false;
            }
        },
    },
    actions : {
        getData(context){
            axios.get('https://codingapple1.github.io/vue/more0.json').then((a)=>{
            context.commit('setMore',a.data)
            })
        },
    },
})

export default store;