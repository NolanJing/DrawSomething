<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="data.user.avatar">
      </div>
      <div class="content">
        你画我猜
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import star from 'components/star/star';
  export default {
    props: {
      data: {}
    },
    data() {
      return {};
    },
    methods: {},
    created() {
    },
    components: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
