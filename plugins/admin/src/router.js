
import Vue from 'vue';
import Router from 'vue-router';

const DisplayModel = () => import(/* webpackChunkName: "display-model" */ './views/DisplayModel.vue');
const EditModel = () => import(/* webpackChunkName: "edit-model" */ './views/EditModel.vue');
const Model = () => import(/* webpackChunkName: "model" */ './views/Model.vue');
const NewModel = () => import(/* webpackChunkName: "new-model" */ './views/NewModel.vue');
const Sub = () => import(/* webpackChunkName: "sub" */ './Sub.vue');
const Section = () => import(/* webpackChunkName: "section" */ './views/Section.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Sub
    },
    {
      path: '/section/:sectionIndex',
      component: Section
    },
    {
      path: '/section/:sectionIndex/model/:modelIndex/page/:pageNumber',
      component: Model
    },
    {
      path: '/section/:sectionIndex/model/:modelIndex/view/:id',
      component: DisplayModel
    },
    {
      path: '/section/:sectionIndex/model/:modelIndex/edit/:id',
      component: EditModel
    },
    {
      path: '/section/:sectionIndex/model/:modelIndex/new',
      component: NewModel
    },
  ]
});