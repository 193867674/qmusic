<template>
  <div class="box" ref="box">
    <div class="top-box">
      <div class="roulink">
        <router-link to="/mine" tag="div" class="inblock">我的</router-link>
        <router-link to="/" exact tag="div" class="inblock">音乐馆</router-link>
        <div class="in" @click="offAudio">
          <router-link to="/find" tag="div" class="inblock">MV</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      show: true,
      val: ""
    };
  },
  methods: {
    offAudio() {
      this.$emit("audio");
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 10px 5px 10px;
  background-color: rgb(49, 193, 123);

  .top-box {
    display: flex;
    width: auto;
    margin-bottom: 15px;
  }

  .roulink {
    margin: 0 auto;

    .inblock {
      width: 60px;
      float: left;
      color: #fff;
      font-size: 18px;
      text-align: center;
      margin-right: 30px;
      display: inline-block;
    }

    .inblock:last-child {
      margin-right: 0;
    }

    .active {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .in {
    display: inline-block
  }
}
</style>