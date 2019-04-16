<template>
  <div>
    <div class="mvlist" v-for="m in mv" :key="m.id">
      <div class="mvname">
        <span>{{m.name}}</span>
        <span>{{m.singer}}</span>
      </div>
      <div>
        <video class="video auto-img" controls>
          <source :src="m.url" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</template>

<script>
const mv =
  "https://api.bzqll.com/music/tencent/hotMvList?key=579621905&year=0&tag=0&area=0&limit=6&offset=0";

export default {
  name: "Find",
  data() {
    return {
      mv: []
    };
  },
  created() {
    this.axios(mv).then(res => {
      // eslint-disable-next-line
      console.log(res.data);
      this.mv = res.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.mvlist {
  width: auto;
  border: 1px solid #d4d4d4;
  margin-bottom: 10px;

  .mvname {
    display: block;
    width: 100%;
  }

  .video {
    width: 97%;
    display: block;
    padding: 5px;
  }
}
</style>
