
<template>
  <div class="card my-2">
    <div class="card-header">
      <h5 class="card-title">{{ action.name }}</h5>
    </div>
    <div class="card-body">
      
      <p>{{ action.description }}</p>
      
      <div class="alert alert-success" v-if="hasSuccess">
        
        <b>SUCCESS</b><br />
        
        {{ message }}
      </div>
      
      <div class="alert alert-danger" v-if="hasError">
        
        <b>ERROR</b><br />
        
        <i>{{ errorField }}</i> <br />
        
        {{ message }}
      </div>
      
      <FormSchema
        v-if="ready"
        :schema="action.schema.fields"
        :obj="instance"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    FormSchema: () => import(/* webpackChunkName: "carolina.db.formschema" */ '../../db/FormSchema.vue')
  },
  props: ['action', 'actionIndex', 'modelIndex', 'sectionIndex', 'instanceId', 'isInstance'],
  data() {
    return {
      instance: null,
      hasSuccess: false,
      hasError: false,
      errorField: "",
      message: '',
      ready: false
    };
  },
  mounted() {
    
    this.instance = {};
    
    for (let fieldName in this.action.schema.fields) {
      this.instance[fieldName] = null;
      if (this.action.schema.fields[fieldName].hasOwnProperty('defaultValue')) {
        this.instance[fieldName] = this.action.schema.fields[fieldName].defaultValue;
      }
    }
    
    this.ready = true;
  },
  methods: {
    handleSubmit: async function(obj) {
      
      let url = `./api/section/${this.sectionIndex}/model/${this.modelIndex}/action/${this.actionIndex}`;
      if (this.isInstance) {
        url = `./api/section/${this.sectionIndex}/model/${this.modelIndex}/instance/${this.instanceId}/action/${this.actionIndex}`;
      }
      
      let res = await fetch(url, {
        method: 'post',
        body: JSON.stringify(obj),
        headers: new Headers({ 'Content-Type': "application/json" })
      });
      let resData = await res.json();
      
      if (resData.success) {
        this.hasError = false;
        this.message = resData.message;
        this.hasSuccess = true;
        this.$forceUpdate();
      }
      else {
        this.hasSuccess = false;
        this.message = resData.message;
        this.errorField = resData.field;
        this.hasError = true;
        this.$forceUpdate();
      }
    }
  }
}
</script>