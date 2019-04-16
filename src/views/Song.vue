<template>
  <div class="song">
    <div class="top">
      <div class="backArrows" @click="datar">
        <router-link to="/" tag="i" class="icon-arrow-left2"></router-link>
      </div>
      <span>{{name}}</span>
    </div>
    <div class="list">
      <div class="songname" v-for="s in song" @click="songs(s,song)" :key="s.id">
        <div>{{s.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Song",
  data() {
    return {
      name: "",
      song: []
    };
  },
  created() {
    this.name = this.$route.query.name;
    this.song = this.$route.query.data;
  },
  methods: {
    datar() {
      this.$emit("goback");
    },
    songs (s,sgs) {
      this.$emit('song',s,sgs)
    }
  }
};
</script>

<style lang="scss" scoped>
.song {
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

  .list {
    margin-top: 40px;
    width: 100%;

    .songname {
      width: auto;
      height: 60px;
      line-height: 60px;
      margin: 5px;
      overflow: hidden;
      border-bottom: 1px solid rgb(233, 229, 231);
    }
  }
}
</style>