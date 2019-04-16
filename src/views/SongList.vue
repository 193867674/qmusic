<template>
  <div class="songlist">
    <div class="top">
      <div class="backArrows" @click="goBack">
        <router-link to="/" tag="i" class="icon-arrow-left2"></router-link>
      </div>
      <span>全部歌曲</span>
    </div>
    <div class="classify">
      <div class="songlistname" v-for="s in songListCate" @click="songs(s,songListCate)" :key="s.id">
        <div>
          {{s.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const songListCategory =
  "https://api.bzqll.com/music/tencent/search?key=579621905&s=%E7&limit=200&offset=0&type=song";
export default {
  name: "SongList",
  data() {
    return {
      songListCate: []
    };
  },
  created() {
    this.axios(songListCategory).then(res => {
      this.songListCate = res.data.data;
    });
  },
  methods: {
    goBack() {
      this.$emit("changes");
    },
    songs(s,sgs) {
      this.$emit('song',s,sgs)
    }
  }
};
</script>

<style lang="scss" scoped>
.songlist {
  padding: 0 5px;

  .top {
    position: fixed;
    top: 0;
    width: 100%;
    display: block;
    text-align: center;
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 15px;
    background-color: #fff;

    .backArrows {
      float: left;
    }
  }

  .classify {
    width: 100%;
    margin-top: 15%;

    .songlistname {
      width: auto;
      height: 60px;
      line-height: 60px;
      margin: 5px;
      border-bottom: 1px solid rgb(233, 229, 231);
      overflow: hidden;
    }
  }
}
</style>