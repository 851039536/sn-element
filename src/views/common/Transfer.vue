<!--
 * @Author: your name
 * @Date: 2021-07-28 14:32:27
 * @LastEditTime: 2021-07-29 08:27:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sn-element\src\views\common\Transfer.vue
-->
<template>
  <div></div>
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.query.id,
      };
    },
    created() {
      this.getall(this.id);
    },
    methods: {
      getall(id) {
        switch (id) {
          case "1":
            this.$router.push("./SnNavigation");
            alert("SnNavigation" + id);
            break;

          default:
            alert("跳转失败" + id);
            break;
        }

      },
    }

  }
</script>

<style>
</style>