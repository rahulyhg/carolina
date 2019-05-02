
<template>
  <div>

    <h1 v-if="ready">
      {{ instance._label || modelSchema.modelName }}
    </h1>
    
    <div class="alert alert-danger" v-if="hasError">
      <b>ERROR</b> <br />
      <i>{{ errorObj.fieldName }}</i> <br />
      {{ errorObj.message }}
    </div>

    <FormSchema
      v-if="ready"
      :backLink="backLink"
      :obj="instance"
      :schema="modelSchema.fields"
      :enforceAdminEdit="true"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>

export default {
  components: {
    FormSchema: () => import(/* webpackChunkName: "carolina.db.formschema" */ '../../db/FormSchema.vue')
  },
  data() {
    return {
      sectionIndex: 0,
      modelIndex: 0,
      modelSchema: null,
      instanceId: null,
      instance: null,
      backLink: '',
      ready: false,
      hasError: false,
      errorObj: null
    };
  },
  mounted: async function() {
    let res = await fetch(`./api/section/${this.$route.params.sectionIndex}/model/${this.$route.params.modelIndex}/schema`);
    this.modelSchema = await res.json();
    res = await fetch(`./api/section/${this.$route.params.sectionIndex}/model/${this.$route.params.modelIndex}/view/${this.$route.params.id}`);
    this.instance = await res.json();
    this.sectionIndex = this.$route.params.sectionIndex;
    this.modelIndex = this.$route.params.modelIndex;
    this.instanceId = this.$route.params.id;
    this.backLink = `/section/${this.sectionIndex}/model/${this.modelIndex}/view/${this.instanceId}`;
    this.ready = true;
    this.$forceUpdate();
  },
  watch: {
    async '$route' (to, from) {
      let res = await fetch(`./api/section/${to.params.sectionIndex}/model/${to.params.modelIndex}/schema`);
      this.modelSchema = await res.json();
      res = await fetch(`./api/section/${to.params.sectionIndex}/model/${to.params.modelIndex}/view/${to.params.id}`);
      this.instance = await res.json();
      this.sectionIndex = to.params.sectionIndex;
      this.modelIndex = to.params.modelIndex;
      this.instanceId = to.params.id;
      this.backLink = `/section/${this.sectionIndex}/model/${this.modelIndex}/view/${this.instanceId}`;
      this.$forceUpdate();
    }
  },
  methods: {
    handleSubmit: async function(obj) {
      
      let res = await fetch(`./api/section/${this.sectionIndex}/model/${this.modelIndex}/edit/${this.instanceId}`, {
        method: 'post',
        body: JSON.stringify(obj),
        headers: new Headers({ 'Content-Type': "application/json" })
      });
      let resData = await res.json();
      
      if (resData.success) {
        this.$router.push(`/section/${this.sectionIndex}/model/${this.modelIndex}/view/${this.instanceId}`); 
      }
      else {
        this.errorObj = resData;
        this.hasError = true;
        this.$forceUpdate();
      }
    }
  }
}
</script>