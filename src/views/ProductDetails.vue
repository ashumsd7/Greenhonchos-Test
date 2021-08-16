<template>
  <div class="cotainer-fluid">
    <div class="row">

      <div class="col-lg-4">
           
        <img :src="ViewProduct.image" alt="" class="img-fluid" />
      </div>
      <div class="col-lg-8 mt-5">
           <small variant="warning">Showing Product SKU: {{ViewProduct.sku}}</small>
        <h2>{{ ViewProduct.name }}</h2>
        <div class="details ml-1 mt-2">
          <strong>{{ name }}</strong>
          <div class="prices">
            <span class="offer"
              ><del>Rs.{{ ViewProduct.price }}</del></span
            >
            <h4 class="selling_price ml-2">
              Rs. {{ ViewProduct.selling_price }}</h4
            >
            <!-- <span class="discount ml-2">-{{ discount }}%</span> -->
            <b-badge pill variant="danger" class="ml-2"
              >-{{ ViewProduct.discount }}%</b-badge
            >
          </div>
          <div class="sizes ml-2 mb-5">SIZE: {{ ViewProduct.size }}</div>
          <label for="">CHECK DELIVERY IN YOUR AREA</label> <br>
          <input type="text" placeholder=" ENTER PINCODE"> 
          <br>
          <b-button class="mt-2" variant="success">ADD TO CART</b-button>    <b-button class="mt-2 ml-3" variant="primary">BUY NOW</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ViewProduct() {
      console.log("this is the product", this.$store.getters.getViewProduct);
      return this.$store.getters.getViewProduct;
    },
  },
};
</script>

<style  scoped>
.discount {
  color: red;
  font-weight: bolder;

}

.offer {
  color: gray;
  font-weight: 16px;
}
.selling_price {
  font-weight: bolder;
}
small{
    background: yellow;
    border-radius: 10px;
}
</style>