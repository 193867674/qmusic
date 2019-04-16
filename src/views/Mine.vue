<template>
  <div class="list">
    <div class="title">播放记录</div>
    <div class="song" v-for="(s) in mySong" @click="songs(s)" :key="s.id">{{s.name}}</div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  props: ["mySong"],
  methods: {
    songs(s) {
      this.$emit("songs", s);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  margin-top: 15px;
  width: 100%;

  .title {
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(233, 229, 231);
  }

  .song {
    width: auto;
    height: 60px;
    line-height: 60px;
    margin: 5px;
    overflow: hidden;
    border-bottom: 1px solid rgb(233, 229, 231);
  }
}
</style>
