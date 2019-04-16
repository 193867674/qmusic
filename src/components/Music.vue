<template>
  <div class="music">
    <audio ref="music" v-show="show" :src="song.url" @timeupdate="upTime" controls></audio>
    <div class="audio">
      <div class="image" @click="musicDetails">
        <img :src="song.pic" class="auto-img">
      </div>
      <div class="songname" @click="musicDetails">
        <div class="singer">{{song.singer}}</div>
        <div class="name">{{song.name}}</div>
      </div>
      <div class="control">
        <div class="img-c" v-if="show1" @click="musicPlay">
          <img src="../../public/img/play.png" class="auto-img">
        </div>
        <div class="img-c" v-else @click="musicStop">
          <img src="../../public/img/stop.png" class="auto-img">
        </div>
      </div>
    </div>

    <div class="details" ref="details">
      <div class="details-top">
        <span>{{song.name}}</span>
        <div class="details-close" @click="musicDetailsArrows">
          <i class="icon-arrow-left2"></i>
        </div>
      </div>

      <div class="lyric">
        <div ref="lyric">
          <div
            ref="lrc"
            class="lrc"
            v-for="(l,i) in lyrics"
            :key="i"
            :class="{'actl': ln === i+1}"
          >{{l.c}}</div>
        </div>
      </div>

      <div class="music-ctrl">
        <div class="widget">
          <div class="widget-img" @click="prev">
            <img src="../../public/img/landscape_pre.png" class="auto-img">
          </div>
          <div class="widget-img">
            <div v-if="show1" @click="musicPlay">
              <img src="../../public/img/landscape_play.png" class="auto-img">
            </div>
            <div @click="musicStop" v-else>
              <img src="../../public/img/landscape_pause.png" class="auto-img">
            </div>
          </div>
          <div class="widget-img" @click="next">
            <img src="../../public/img/landscape_next.png" class="auto-img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var n = 0;
export default {
  name: "Music",
  props: ["song", "lyrics"],
  data() {
    return {
      show: false,
      show1: true,
      m: 0,
      ln: 8
    };
  },
  methods: {
    musicPlay() {
      this.$refs.music.play();
      this.show1 = false;
      this.$emit("play");
    },
    musicStop() {
      this.$refs.music.pause();
      this.show1 = true;
    },
    musicDetails() {
      this.$refs.details.style.top = "-1px";
    },
    musicDetailsArrows() {
      this.$refs.details.style.top = "100%";
    },
    prev() {
      this.$emit("prev");
      this.musicStop();
    },
    next() {
      this.$emit("next");
      this.musicStop();
    },
    upTime(e) {
      if (
        parseFloat(this.lyrics[this.ln].t) <= e.target.currentTime.toFixed(3) &&
        e.target.currentTime.toFixed(3) <= parseFloat(this.lyrics[this.ln + 1].t)
      ) {
        // eslint-disable-next-line
        console.log(this.lyrics[this.ln].c,this.ln);
        this.lrcHeight();
        this.ln++;
      this.m++;
      }
    },
    lrcHeight() {
      if (this.m >= 5) {
        this.$refs.lyric.style.transform = "translateY(-" + 31 * n + "px)";
        this.$refs.lyric.style.transition = "transform .3s linear";
        n++;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.music {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  background-color: rgb(243, 233, 233);

  .audio {
    padding: 10px;
    width: auto;

    .image {
      float: left;
      width: 20%;
      margin-right: 10px;
    }

    .songname {
      float: left;
      width: 50%;
    }

    .name {
      font-size: 18px;
    }

    .singer {
      margin-top: 10px;
      margin-bottom: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .control {
    float: right;

    .img-c {
      flex: 1;
      margin-top: 15px;
      width: 45%;
    }
  }

  .details {
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(32, 29, 29);
    z-index: 10;

    .details-top {
      margin-top: 15px;
      width: auto;
      text-align: center;
      color: #fff;
      font-size: 18px;
    }

    .details-close {
      float: left;
    }

    .lyric {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: 100%;
      height: 48%;
      overflow: hidden;
      color: rgba(243, 242, 242, 0.7);
    }

    .lrc {
      margin-top: 15px;
      text-align: center;
    }

    .music-ctrl {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 17%;
      text-align: center;
    }

    .widget {
      margin-top: 8%;
    }

    .widget-img {
      width: 15%;
      display: inline-block;
    }
  }

  .actl {
    color: rgba(3, 247, 44, .7);
  }
}
</style>
