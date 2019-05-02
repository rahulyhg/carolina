
<template>
  <div>

    <h1 class="display-3">{{ section.title }}</h1>

    <p class="lead">{{ section.description }}</p>

    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Models</h5>
      </div>
      <div class="card-body">
        <router-link class="card-link" :to="'/section/' + sectionIndex + '/model/' + index + '/page/1'" v-for="(model, index) in section.models" :key="index">{{ model }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      section: {},
      sectionIndex: 0
    };
  },
  mounted: async function() {
    let res = await fetch(`./api/section/${this.$route.params.sectionIndex}`);
    this.section = await res.json();
    this.sectionIndex = this.$route.params.sectionIndex;
    this.$forceUpdate();
  },
  watch: {
    async '$route' (to, from) {
      let res = await fetch(`./api/section/${to.params.sectionIndex}`);
      this.section = await res.json();
      this.sectionIndex = to.params.sectionIndex;
      this.$forceUpdate();
    }
  }
}
</script>