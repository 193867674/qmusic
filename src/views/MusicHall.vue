<template>
  <div>
    <!-- 轮播图 -->
    <div class="slideshow">
      <ul class="list" ref="list">
        <li v-for="m in images" :key="m.id">
          <img :src="m.picUrl" class="auto-img">
        </li>
        <li>
          <img :src="picUrl" class="auto-img">
        </li>
      </ul>
    </div>
    <!-- 歌单列表 -->
    <div class="fl-box">
      <div class="songtitle" @click="newSongList">
        <span>为您推荐歌单</span>
        <router-link to="/songlist" tag="i" class="icon icon-circle-right"></router-link>
      </div>
      <div class="songlist">
        <div class="sl-div" @click="songListToggle('古风'),newSongList()">
          <div class="sl-img">
            <img src="../../public/img/sl1.jpg" class="auto-img">
          </div>
          <span class="sl-name">古风</span>
        </div>
        <div class="sl-div" @click="songListToggle('摇滚'),newSongList()">
          <div class="sl-img">
            <img src="../../public/img/sl2.jpg" class="auto-img">
          </div>
          <span class="sl-name">摇滚</span>
        </div>
        <div class="sl-div mar-rig" @click="songListToggle('民谣'),newSongList()">
          <div class="sl-img">
            <img src="../../public/img/sl3.jpg" class="auto-img">
          </div>
          <span class="sl-name">民谣</span>
        </div>
        <div class="sl-div" @click="songListToggle('纯音乐',newSongList())">
          <div class="sl-img">
            <img src="../../public/img/sl4.jpg" class="auto-img">
          </div>
          <span class="sl-name">纯音乐</span>
        </div>
        <div class="sl-div" @click="songListToggle('爵士'),newSongList()">
          <div class="sl-img">
            <img src="../../public/img/sl5.jpg" class="auto-img">
          </div>
          <span class="sl-name">爵士</span>
        </div>
        <div class="sl-div mar-rig" @click="songListToggle('节奏控'),newSongList()">
          <div class="sl-img">
            <img src="../../public/img/sl6.jpg" class="auto-img">
          </div>
          <span class="sl-name">节奏控</span>
        </div>
      </div>
    </div>
    <!-- 最新专辑 -->
    <div class="album">
      <div class="albumtitle" @click="newSongList">
        <span>最新专辑</span>
      </div>
      <div class="albumlist">
        <div
          class="al-div"
          v-for="item in album"
          :key="item.id"
          @click="albumToggle(item.albumName,item.albumMID,item.albumPic),newSongList()"
        >
          <div class="al-img">
            <img :src="item.albumPic" class="auto-img">
          </div>
          <span class="al-name">{{item.albumName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const url = "/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
const alb =
  "https://api.bzqll.com/music/tencent/search?key=579621905&s=%E8%A5%BF&limit=6&offset=0&type=album";

export default {
  name: "MusicHall",
  data() {
    return {
      images: [],
      index: 0,
      picUrl: "",
      songlist: "",
      song: [],
      album: []
    };
  },
  created() {
    this.axios(url).then(res => {
      this.images = res.data.data.slider;
      this.picUrl = this.images[0].picUrl;
      this.myIndex();
    });
    this.axios(alb).then(res => {
      this.album = res.data.data;
    });
  },
  methods: {
    myIndex() {
      var sl = encodeURI("热门");
      this.songList = sl;
      setInterval(() => {
        // this.index < this.images.length  ? this.index++ : this.index = 0;

        this.index++;
        this.$refs.list.style.transform =
          "translateX(-" + (100 / (this.images.length + 1)) * this.index + "%)";
        this.$refs.list.style.transition = "transform .3s linear";
        if (this.index === this.images.length) {
          setTimeout(() => {
            this.$refs.list.style.transition = "none";
            this.index = 0;
            this.$refs.list.style.transform = "translateX(0)";
          }, 1000);
        }
      }, 4000);
    },
    songListToggle(a) {
      this.songlist = encodeURI(a);

      var songList =
        "https://api.bzqll.com/music/tencent/search?key=579621905&s=" +
        this.songlist +
        "&limit=30&offset=0&type=song";

      this.axios(songList).then(res => {
        this.song = res.data.data;
        this.$router.push({
          path: "/song",
          query: { name: a, data: this.song }
        });
      });
    },
    newSongList() {
      this.$emit("change");
    },
    albumToggle(v, i, m) {
      this.$router.push({
        path: "/album",
        query: { name: v, data: i, pic: m }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.slideshow {
  width: 100%;
  overflow: hidden;
  margin-bottom: 14px;

  .list {
    display: flex;
    width: 600%;
  }

  li {
    flex: 1 1 100%;
    float: left;
  }
}
.fl-box {
  padding: 0 10px;

  .songtitle {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 14px;
    text-align: center;

    span {
      font-size: 18px;
    }

    .icon {
      float: right;
    }
  }

  .songlist {
    display: flex;
    width: 100%;
    display: inline-block;

    .sl-div {
      flex: 1 1 100%;
      float: left;
      margin-right: 5px;
    }

    .sl-img {
      width: 115px;
      height: 115px;
    }

    .mar-rig {
      margin-right: 0;
    }

    .sl-name {
      flex: 1 1 100%;
      display: block;
      margin: 10px 0;
      font-size: 14px;
    }
  }
}
.album {
  padding: 0 10px;

  .albumtitle {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 14px;
    text-align: center;

    .icon {
      float: right;
    }
  }
  .albumlist {
    width: 100%;
    display: inline-block;

    .al-div {
      float: left;
      margin-right: 5px;
    }

    .al-div:nth-child(3) {
      margin-right: 0;
    }

    .al-div:nth-child(6) {
      margin-right: 0;
    }

    .al-img {
      width: 115px;
      height: 115px;
    }

    .al-name {
      width: 115px;
      display: block;
      padding: 10px 0;
      font-size: 14px;
      word-wrap: break-word;
    }
  }
}
</style>