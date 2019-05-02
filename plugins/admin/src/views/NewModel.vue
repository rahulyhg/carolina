
<template>
  <div>

    <h1 v-if="ready">
      {{ modelSchema.modelName }}
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
    
    this.instance = {};
    
    for (let fieldName in this.modelSchema.fields) {
      this.instance[fieldName] = null;
      if (this.modelSchema.fields[fieldName].hasOwnProperty('defaultValue')) {
        this.instance[fieldName] = this.modelSchema.fields[fieldName].defaultValue;
      }
    }
    
    this.sectionIndex = this.$route.params.sectionIndex;
    this.modelIndex = this.$route.params.modelIndex;

    this.backLink = `/section/${this.sectionIndex}/model/${this.modelIndex}/page/1`;
    this.ready = true;
    this.$forceUpdate();
  },
  watch: {
    async '$route' (to, from) {
      
      let res = await fetch(`./api/section/${to.params.sectionIndex}/model/${to.params.modelIndex}/schema`);
      this.modelSchema = await res.json();
      
      this.instance = {};
      
      for (let fieldName in this.modelSchema.fields) {
        this.instance[fieldName] = null;
        if (this.modelSchema.fields[fieldName].hasOwnProperty('defaultValue')) {
          this.instance[fieldName] = this.modelSchema.fields[fieldName].defaultValue;
        }
      }
      
      this.sectionIndex = to.params.sectionIndex;
      this.modelIndex = to.params.modelIndex;

      this.backLink = `/section/${this.sectionIndex}/model/${this.modelIndex}/page/1`;
      this.$forceUpdate();
    }
  },
  methods: {
    handleSubmit: async function(obj) {
      
      let res = await fetch(`./api/section/${this.sectionIndex}/model/${this.modelIndex}/create`, {
        method: 'post',
        body: JSON.stringify(obj),
        headers: new Headers({ 'Content-Type': "application/json" })
      });
      let resData = await res.json();
      
      if (resData.success) {
        this.$router.push(`/section/${this.sectionIndex}/model/${this.modelIndex}/page/1`); 
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