<template>
  <div class="right">
    <!-- 设计样式 -->
    <div class="category">
      <ul class="shop">
        <li class="shopCate" v-for="(item, index) in goods" :key="index" @click="listGood(item)">
          <a>
            <div class="part">
              <img :src="$imgpath(item.img)" alt="" />
            </div>
            <span class=" _1qVto">
              <span class="bae_X">{{ getcattitle(item) }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      goods: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
    data() {
      return {
        //imgURL: img.ImgUrlPath,
      };
    },
    methods: {
      // 跳转页面
      listGood(cat) {
        let codes = [];
        if (cat.items) {
          for (var i = 0; i < cat.items.length; i++) {
            codes.push(cat.items[i].id);
          }
        }
        this.$router.push({
          path: "/listPage",
          query: { type: "category", code: codes.join(",") },
        });

      },
      getcattitle(item) {
        if (this.LangType == "ru")
          return item.runame
        else
          return item.name
      },
    },
  };
</script>

<style lang="less" scoped>
  span {
    font-size: 10px;
  }

  .right {
    flex: 7;
    position: relative;
    overflow: scroll;
    box-sizing: border-box;
    background-color: #fff;

    .category {
      padding: 12px 12px 0;

      .shop {
        display: flex;
        flex-wrap: wrap;

        .shopCate {
          width: 33%;
          padding: 10px 0px;

          a {
            display: block;
            width: 100%;
            color: inherit;
          }

          .part {
            padding: 0 10px;

            img {
              height: 100%;
              width: 100%;
            }
          }

          ._1qVto {
            height: 39px;
            align-items: center;
            display: flex;

            .bae_X {
              text-align: center;
              overflow: hidden;
              word-break: break-word;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              width: 100%;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>