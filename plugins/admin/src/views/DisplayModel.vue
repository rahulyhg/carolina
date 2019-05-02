
<template>
  <div>

    <h1 class="display-3" v-if="ready">
      {{ instance._label || modelSchema.modelName }}
    </h1>
    
    <h4 class="display-5" v-if="ready">Details</h4>

    <ViewSchema v-if="ready" :obj="instance" :schema="modelSchema.fields" />

    <br />
    
    <h4 class="display-5" v-if="ready">Options</h4>

    <router-link class="btn btn-light" :to="'/section/' + sectionIndex + '/model/' + modelIndex + '/edit/' + instance._id">
      <i class="fa fa-edit"></i> Edit
    </router-link>
    <a class="btn btn-danger" @click="onDeletePress">
      <i class="fa fa-trash"></i> Delete
    </a>
    <router-link class="btn btn-info" :to="'/section/' + sectionIndex + '/model/' + modelIndex + '/page/1'">
      Back
    </router-link>
    
    <br />
    <br />
    
    <h4 class="display-5" v-if="ready">Object Actions</h4>
    
    <ModelAction
      v-for="(action, ai) in actions"
      :action="action"
      :actionIndex="ai"
      :sectionIndex="sectionIndex"
      :modelIndex="modelIndex"
      :instanceId="instanceId"
      :isInstance="true"
    />
  </div>
</template>

<script>

import swal from 'sweetalert2';

export default {
  components: {
    ModelAction: () => import(/* webpackChunkName: "carolina.admin.model-action" */ '../components/ModelAction.vue'),
    ViewSchema: () => import(/* webpackChunkName: "carolina.db.viewschema" */ '../../db/ViewSchema.vue')
  },
  data() {
    return {
      actions: [],
      sectionIndex: 0,
      modelIndex: 0,
      modelSchema: null,
      instanceId: null,
      instance: null,
      ready: false
    };
  },
  mounted: async function() {
    let res = await fetch(`./api/section/${this.$route.params.sectionIndex}/model/${this.$route.params.modelIndex}/schema`);
    this.modelSchema = await res.json();
    res = await fetch(`./api/section/${this.$route.params.sectionIndex}/model/${this.$route.params.modelIndex}/view/${this.$route.params.id}`);
    this.instance = await res.json();
    res = await fetch(`./api/section/${this.$route.params.sectionIndex}/model/${this.$route.params.modelIndex}/instance-actions`);
    this.actions = await res.json();
    this.sectionIndex = this.$route.params.sectionIndex;
    this.modelIndex = this.$route.params.modelIndex;
    this.instanceId = this.$route.params.id;
    this.ready = true;
    this.$forceUpdate();
  },
  watch: {
    async '$route' (to, from) {
      let res = await fetch(`./api/section/${to.params.sectionIndex}/model/${to.params.modelIndex}/schema`);
      this.modelSchema = await res.json();
      res = await fetch(`./api/section/${to.params.sectionIndex}/model/${to.params.modelIndex}/view/${to.params.id}`);
      this.instance = await res.json();
      res = await fetch(`./api/section/${this.$route.params.sectionIndex}/model/${this.$route.params.modelIndex}/instance-actions`);
      this.actions = await res.json();
      this.sectionIndex = to.params.sectionIndex;
      this.modelIndex = to.params.modelIndex;
      this.instanceId = to.params.id;
      this.$forceUpdate();
    }
  },
  methods: {
    onDeletePress: async function() {
      
      let self = this;
      
      let result = await swal({
        title: 'Delete Model?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#888',
        confirmButtonText: 'Yes, delete it!'
      });
      
      console.log(result);
      
      if (result.value) {
        
        let res = await fetch(`./api/section/${this.sectionIndex}/model/${this.modelIndex}/delete/${this.instanceId}`);
        
        await swal(
          'Deleted!',
          'This object has been deleted.',
          'success'
        );
        
        this.$router.push(`/section/${this.sectionIndex}/model/${this.modelIndex}/page/1`);
      }
    }
  }
}
</script>