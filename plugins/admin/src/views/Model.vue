
<template>
  <div>

    <h1 class="display-3" v-if="ready">
      {{ modelSchema.modelName }}
    </h1>

    <p>
      <router-link class="btn btn-lg btn-primary" v-if="ready" to="../new">
        <i class="fa fa-plus"></i> Create New
      </router-link>
    </p>
    
    <br />
    
    <h4 class="display-5" v-if="ready">Instances</h4>

    <table class="table" v-if="ready">
      <thead>
        <tr>
          <th>ID / Label</th>
          <th v-for="(adminFieldName, i) in modelSchema.adminFields" :key="i">
            {{ modelSchema.fields[adminFieldName].name || adminfieldName }}
          </th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <TableSchema
          v-for="(instance, i) in instances"
          :key="i"
          :includeActionButtons="true"
          :includeId="true"
          :fields="modelSchema.adminFields"
          :obj="instance"
          :schema="modelSchema.fields"
        />
      </tbody>
    </table>
    
    <nav v-if="ready">
      <ul class="pagination">
        <li class="page-item">
          <router-link
            class="page-link"
            v-if="pageNumber > 1"
            :to="'/section/' + sectionIndex + '/model/' + modelIndex + '/page/' + (parseInt(pageNumber)-1)"
            tabindex="-1">Previous</router-link>
        </li>
        <li class="page-item">
          <router-link
            class="page-link"
            v-if="instances.length"
            :to="'/section/' + sectionIndex + '/model/' + modelIndex + '/page/' + (parseInt(pageNumber)+1)"
            tabindex="-1">Next</router-link>
        </li>
      </ul>
    </nav>
    
    <br />
    
    <div v-if="actions">
      
      <h4 class="display-5">Model Actions</h4>
      
      <ModelAction
        v-for="(action, ai) in actions"
        :action="action"
        :actionIndex="ai"
        :sectionIndex="sectionIndex"
        :modelIndex="modelIndex"
      />
      
      <br />
    </div>
  </div>
</template>

<script>

export default {
  components: {
    ModelAction: () => import(/* webpackChunkName: "carolina.admin.model-action" */ '../components/ModelAction.vue'),
    TableSchema: () => import(/* webpackChunkName: "carolina.db.tableschema" */ '../../db/TableSchema.vue')
  },
  data() {
    return {
      actions: [],
      sectionIndex: 0,
      modelIndex: 0,
      pageNumber: 0,
      modelSchema: null,
      instances: null,
      newLink: '',
      ready: false
    };
  },
  mounted: async function() {
    let res = await fetch(`./api/section/${this.$route.params.sectionIndex}/model/${this.$route.params.modelIndex}/schema`);
    this.modelSchema = await res.json();
    res = await fetch(`./api/section/${this.$route.params.sectionIndex}/model/${this.$route.params.modelIndex}/${this.$route.params.pageNumber}`);
    this.instances = await res.json();
    res = await fetch(`./api/section/${this.$route.params.sectionIndex}/model/${this.$route.params.modelIndex}/actions`);
    this.actions = await res.json();
    this.sectionIndex = this.$route.params.sectionIndex;
    this.modelIndex = this.$route.params.modelIndex;
    this.pageNumber = this.$route.params.pageNumber;
    this.newLink = `/section/${this.sectionIndex}/model/create/${this.modelIndex}`;
    this.ready = true;
    this.$forceUpdate();
  },
  watch: {
    async '$route' (to, from) {
      let res = await fetch(`./api/section/${to.params.sectionIndex}/model/${to.params.modelIndex}/schema`);
      this.modelSchema = await res.json();
      res = await fetch(`./api/section/${to.params.sectionIndex}/model/${to.params.modelIndex}/${to.params.pageNumber}`);
      this.instances = await res.json();
      this.sectionIndex = to.params.sectionIndex;
      this.modelIndex = to.params.modelIndex;
      this.pageNumber = to.params.pageNumber;
      this.newLink = `/section/${this.sectionIndex}/model/create/${this.modelIndex}`;
      this.$forceUpdate();
    }
  }
}
</script>