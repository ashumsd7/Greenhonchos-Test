<template>
  <div class="container-fluid">
    
    <div class="row d-flex justify-content-center ">
      <Error v-if="isError" />
     
    </div>

    <div class="row">
      <div class="col-lg-2 side_filter">
        <SideFilter />
      </div>
      <div class="col-lg-10  ">
         <Loading v-if="isLoading" />
            <b-badge  @click="loadMore"  pill variant="success" class="mt-2" v-if="!isError && !isLoading ">Showing {{getProducts.length}} Products   </b-badge>
         <div class="d-flex jutstify-content-around flex-wrap"  v-if="!isError && !isLoading ">
         
        <ProductImage 
          :name="item.name"
          :price="item.price"
          :selling_price="item.selling_price"
          :discount="item.discount"
          :size="item.size"
          :image="item.image"
          v-for="item in getProducts"
          :key="item.timeStamp"
        />
        </div>
        <div class="m-auto" v-if="!isError && !isLoading ">
          <img width="80" height="80" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="" srcset="">
             <b-button @click="loadMore" variant="success"> {{ isLoadMoreClicked ? 'Loading...' : 'Load More Products'}}</b-button>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductImage from "../components/reusable/ProductImage.vue";
// import SideFilter from '../components/reusable/SideFilter.vue'
import SideFilter from "../components/reusable/ProductFilter.vue";
import Error from "../components/Error.vue";
import Loading from "../components/Loading.vue";

export default {
   data() {
    return {
      // onDemandProducts:[],
      scrollAmmount:500,
      isLoadMoreClicked:false
    };
  },
  components: {
    ProductImage,
    SideFilter,
    Error,
    Loading,
    
   
  },
   created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {

    getProducts() {
      return this.$store.getters.getProducts;
    },

    isError() {
      return this.$store.getters.isError;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
   
  },

  
  
  methods: {
    loadMore(){
      this.isLoadMoreClicked=true;
      this.$store.dispatch('loadMoreDataAction')
       this.isLoadMoreClicked=false;
    },
    handleScroll(){
      if(window.scrollY>this.scrollAmmount){
        // alert(window.scrollY)
        this.scrollAmmount+=600;
        setTimeout(() => {
          this.loadMore();
        }, 200);
        
      }
    }
  },
};
</script>
<style scoped>
.badge-success {
  font-size: 1.2rem;
}
.side_filter{
  background: linear-gradient(230deg,rgb(166, 248, 166),white);
  height: 100vh;
}

@media screen and (max-width: 600px) {
  
}
</style>
