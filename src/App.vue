<template>
  <div id="app">
    <Header v-show="show" @audio="audio"></Header>
    <keep-alive>
      <router-view
        @change="change"
        @changes="change"
        @goback="change"
        @go="change"
        @song="songs"
        @songs="mysong"
        :mySong="mySong"
        :key="key"
      ></router-view>
    </keep-alive>
    <Music v-show="show1" @next="next" @prev="prev" :song="song" :lyrics="lyrics" @play="play"></Music>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Music from "./components/Music.vue";

export default {
  name: "App",
  data() {
    return {
      show: true,
      show1: false,
      song: {},
      mySong: [],
      songListCate: [],
      lyric: [],
      lyrics: []
    };
  },
  methods: {
    change() {
      this.show = !this.show;
    },
    songs(s, songs) {
      this.show1 = true;
      this.songListCate = songs;
      this.song = s;
      this.mySong.push(this.song);
      this.songLrc = s.lrc;
      this.lyricArr(this.songLrc);
    },
    mysong(s) {
      this.show1 = true;
      this.song = s;
    },
    play() {
      this.lyricArr(this.songLrc);
    },
    next() {
      var i = this.songListCate.indexOf(this.song);
      this.song = this.songListCate[i + 1];
      this.songLrc = this.song.lrc;
      this.lyricArr(this.songListCate[i + 1].lrc);
      this.mySong.push(this.song);
    },
    prev() {
      var i = this.songListCate.indexOf(this.song);
      if (i > 0) {
        this.song = this.songListCate[i - 1];
      }
      this.songLrc = this.song.lrc;
      this.lyricArr(this.songListCate[i - 1].lrc);
    },
    lyricArr(a) {
      this.axios(a).then(res => {
        this.lyric = res.data.split("\n");
      });
      this.createLrc(this.lyric);
    },
    audio() {
      this.show1 = false;
    },
    createLrc(lrc) {
      this.lyrics = [];
      for (var i = 0; i < lrc.length; i++) {
        var t = lrc[i].substring(lrc[i].indexOf("[") + 1, lrc[i].indexOf("]"));
        this.lyrics.push({
          t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
          c: lrc[i].substring(lrc[i].indexOf("]") + 1, lrc[i].length)
        });
      }
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  },
  components: {
    Header,
    Music
  }
};
</script>


<style>
</style>
