
<template>
  <div class="row">
    <div class="bg-dark col-md-3">

      <div class="container">
        
        <h3>Carolina Admin</h3>

        <ul class="list-unstyled">
          <li v-for="section in sections" :key="section.title">
            <i :class="'fa fa-' + section.icon"></i>
            <router-link class="text-light" :to="section.link">{{ section.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-9">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Sub: () => import(/* webpackChunkName: "sub" */ './Sub.vue')
  },
  data() {
    return {
      sections: []
    };
  },
  mounted: async function() {
    console.log('api call');
    let res = await fetch('./api/list-sections');
    this.sections = await res.json();
    this.$forceUpdate();
  }
}
</script>