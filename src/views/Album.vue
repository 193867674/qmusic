<template>
  <div class="album">
    <div class="top">
      <div class="backArrows" @click="albumgo">
        <router-link to="/" tag="i" class="icon-arrow-left2"></router-link>
      </div>
      <span>{{name}}</span>
      <div class="albumtitle">
        <div class="image">
          <img :src="albumimg" class="auto-img">
        </div>
        <div class="desc">
          <div class="name">{{album.name}}</div>
          <div class="singer">{{album.singer}}</div>
          <div class="d-desc">简介: {{album.desc}}</div>
        </div>
      </div>
    </div>
    <div class="songs">
      <div class="list" v-for="s in album.songs" @click="songs(s,album.songs)" :key="s.id">
        <div>{{s.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Album",
  data() {
    return {
      name: "",
      albumid: "",
      album: {},
      albumimg: ""
    };
  },
  created() {
    this.name = this.$route.query.name;
    this.albumid = this.$route.query.data;
    this.albumimg = this.$route.query.pic;

    const album =
      "https://api.bzqll.com/music/tencent/album?key=579621905&id=" +
      this.albumid +
      "";
    this.axios(album).then(res => {
      this.album = res.data.data;
    });
  },
  methods: {
    albumgo() {
      this.$emit("go");
    },
    songs (s,sgs) {
      this.$emit('song',s,sgs)
    }
  }
};
</script>
<style lang="scss" scoped>
.album {
  position: relative;

  .top {
    flex: 1;
    position: fixed;
    top: 0;
    width: 100%;
    display: block;
    text-align: center;
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 15px;
    background-color: rgba(150,150,150,1);

    .backArrows {
      float: left;
    }
  }
  .albumtitle {
    margin-top: 20px;

    .image {
      width: 100px;
      height: 100px;
      margin-left: 10px;
      margin-right: 5px;
      float: left;
    }

    .desc {
      float: left;
      width: 67%;
    }

    .name {
      width: 100%;
      font-size: 22px;
      margin-top: 15px;
      font-weight: bold;
    }

    .singer {
      margin-top: 20px;
      font-size: 18px;
      margin-top: 15px;
    }

    .d-desc {
      margin-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .songs {
    position: absolute;
    top: 163px;
    left: 0;
    margin-top: 20px;
    width: 100%;

    .list {
      width: auto;
      height: 50px;
      line-height: 50px;
      margin-bottom: 10px;
      border-bottom: 1px solid rgb(189, 189, 189);
    }
  }
}
</style>