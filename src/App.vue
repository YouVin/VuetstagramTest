<template>
<div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">올리기</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>
  <!-- <h4>{{ $store.state.age }}</h4>
  <button @click="$store.commit('changeage',10)">버튼</button> -->
  <Container @write="write = $event" :images="images" :게시물="게시물" :step= "step"/>
  <button v-if="step == 0" @click="more">더보기</button>
  
  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" multiple accept="image/*" type="file" id="file" class="inputfile" />
      <label v-if="step == 0"  for="file" class="input-plus">+</label>
    </ul>
 </div>


 <!-- 
<div v-if = "step == 0">내용</div>
<div v-if = "step == 1">내용1</div>
<div v-if = "step == 2">내용2</div>
<button @click="step =0">버튼0</button>
<button @click="step =1">버튼1</button>
<button @click="step =2">버튼2</button> -->
</template>

<script>
import Container from './components/Container'
import postdata from './assets/postdata.js'
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  data(){
    return{
      step : 0,
      게시물 : postdata,
      images : '',
      write : '',
      선택한필터 : '',
    }
  },
  mounted(){
    this.emitter.on('boxclick',(a)=>{
      this.선택한필터 = a;
    });
  },
  components: {
    Container,
  },

  computed: {
    ...mapState(['likes',]),
  },
  methods:{
    ...mapMutations(['setMore','좋아요']),
    //axios.post('url',{name : 'kim'})..-> post로 요청후 name 데이터 넘기기
    more(){
      axios.get('https://codingapple1.github.io/vue/more0.json')//get axios함수
      .then((result)=>{//콜백함수
        console.log(result.data);
        this.게시물.push(result.data);//push하여 데이터 넣기
      }).catch((err)=>{
        
      })
    },
    upload(e){
      let f = e.target.files;
      let u = URL.createObjectURL(f[0]);
      this.images = u;
      this.step++;
    },
    publish(){
      var mylist = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.images,
        likes: 0,
        date: "May 15",
        liked: false,
        content: this.write,
        filter: this.선택한필터
      };
      this.게시물.unshift(mylist);
      this.step = 0;
    }
  }
}
</script>

<style>
@import 'style.css';


body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
} 
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
