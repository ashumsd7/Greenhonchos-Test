<template>
  <div>
        <b-badge class="mt-2" pill variant="info">Filter Products</b-badge>
          <b-button v-show="showClear" @click="reload" class="clear m-2" variant="danger"> [X]Clear All</b-button>
    <div class="row ml-2" v-for="item in fetchedFilters" :key="item.timeStamp" >
      <div>
        <b-button v-b-toggle="'collapse'" class="m-1">{{item.category}}</b-button>
        <b-collapse id="collapse" v-for="subcategory in item.options" :key="subcategory.frequent_filter_count" >
          <b-card >
            <input
              class="form-check-input ml-1"
              type="checkbox"
              name="product_category-Kurtas"
              :value="subcategory.value_key"
              id="kurta"
              @change="filterData(subcategory.code,subcategory.value)"
            />
            <label class="form-check-label ml-4" for="flexCheckDefault">
              {{subcategory.value }} ( {{ subcategory.total}}) 
            </label>
          </b-card>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     showClear:false
     
    
    };
  },
  computed: {
    fetchedFilters() {
      return this.$store.getters.getFilters;
    },
  },
  methods: {
   
     filterData(code,value){ 
         this.showClear= true    
    //   code+ '-' +value;
    let filter= code+ '-' +value
    this.$store.dispatch('loadDataAction',filter)
  },
  reload(){
      window.location.reload()
  }
  },
 
 
};
</script>

<style  scoped>
button{
    background: transparent;
    color: black;
    width: 150px;
}
.btn-secondary:hover {
    color: #fff;
    background-color: #4adf0f;
    border-color: #545b62;
}
.badge-info {
   font-size: 1.2rem;
}
.clear{
    background: rgb(252, 67, 67);
}


</style>