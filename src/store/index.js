import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import axios from "axios";
export default new Vuex.Store({
  state: {
    products: [], //all products
    filters: [], //all filters label, values etc
    traceFilter: "", //to track live filter
    isError: false, // for err
    isLoading: false, // when api loads
    countProducts: 10, // load more + counting+2
    filterSet: new Set(), // filterset for unique filter
  },
 //MUTATIONS
  mutations: {
    //reseting products array
    resetProductsMutation(state) {
      state.products = [];
    },
    //toggling Error on main screen
    toggleErrorMutation(state, isError) {
      state.isError = isError;
    },
    //toggling Loader on main screen
    toggleLoadingMutation(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  //ACTIONS
  actions: {
    //fetching data for the first time from server
    loadDataAction(context, filter) {
      if (filter !== "") {
        if (context.state.filterSet.has(filter)) {
          context.state.filterSet.delete(filter);
        } else {
          context.state.filterSet.add(filter);
        }
      }

      let array = [...context.state.filterSet];
      context.state.traceFilter = array.toString();
      context.commit("resetProductsMutation");
      context.dispatch("loadFiltersAction");
      context.commit("toggleLoadingMutation", true);
      //calling API
      axios
        .get(
          `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=1&count=10&sort_by=&sort_dir=desc&filter=${context.state.traceFilter}`
        )
        .then((res) => {
          let products = res.data.result.products;
          //extracting products main values to display on screen
          for (let item of products) {
            let product = {
              name: item.name,
              price: item.price,
              image: item.image,
              selling_price: item.selling_price,
              size: item.size,
              discount: item.discount,
              sku: item.sku,
              //timestamp for a unique key : when we iterate using v-for
              timeStamp: Math.random().toString(),
            };
            //pushing in state products state
            context.state.products.push(product);
            context.commit("toggleLoadingMutation", false);
          }
        })
        //catching if any error while fetching data ( products)
        .catch(function(error) {
          console.log("errr>>>", error);
          context.commit("toggleErrorMutation", true);
          context.commit("toggleLoadingMutation", true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    },
    //ACTION: when user clicks load more products
    // there is some code repeations can be modified later
    loadMoreDataAction(context) {
      context.state.countProducts += 5;

      axios
        .get(
          `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=1&count=${context.state.countProducts}&sort_by=&sort_dir=desc&filter=${context.state.traceFilter}`
        )
        .then((res) => {
          let products = res.data.result.products;
          let loadedProducts = [];
          for (let item of products) {
            let product = {
              name: item.name,
              price: item.price,
              image: item.image,
              selling_price: item.selling_price,
              size: item.size,
              discount: item.discount,
              sku: item.sku,
              timeStamp: Math.random().toString(),
            };
            loadedProducts.push(product);
            context.state.products = [
             
              ...loadedProducts,
            ];
            context.commit("toggleLoadingMutation", false);
          }
        });
    },
// loading all filters for the side filter : all data is dynamic
    loadFiltersAction(context) {
      axios
        .get(
          "https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=1&count=20&so"
        )
        .then((res) => {
          let filters = res.data.result.filters;

          for (let filterItem of filters) {
            let filter = {
              category: filterItem.filter_lable,
              options: filterItem.options,
              timeStamp: Math.random().toString(),
            };
            context.state.filters.push(filter);
          }

          // console.log(context.state.filters);
          // let sort = res.data.result.sort;
        });
    },
  },
  //GETTERS
  getters: {
    getProducts(state) {
    
    
      // let things = Array.from(new Set(state.products.map(JSON.stringify))).map(JSON.parse);
      return state.products;
    },
    getFilters(state) {
      return state.filters;
    },
    isError(state) {
      return state.isError;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
});
