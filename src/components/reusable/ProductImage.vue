<template>
  <div class="m-2 product_box mb-5">
    <div class="d-flex justify-content-center img_container">
      <img class="main-img" :src="image" />
    </div>
    <div
      @click="viewProduct(setProduct)"
      class="view-details d-flex justify-content-center align-items-center"
    >
      View Details
    </div>
    <div class="details ml-1 mt-2">
      <cite>{{ name }}</cite>
      <div class="prices">
        <span class="offer"
          ><del>Rs.{{ price }}</del></span
        >
        <span class="selling_price ml-2"> Rs. {{ selling_price }}</span>
        <!-- <span class="discount ml-2">-{{ discount }}%</span> -->
        <b-badge pill variant="danger" class="ml-2">-{{ discount }}%</b-badge>
      </div>
      <!-- <div class="sizes ml-2">
       SIZE:  {{ size }}
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "image", "price", "selling_price", "discount", "size","sku"],
  computed: {
    setProduct() {
      let productDetails = {
        name: this.name,
        image: this.image,
        price: this.price,
        selling_price: this.selling_price,
        discount: this.discount,
        size: this.size,
        sku:this.sku
      };
      return productDetails;
    },
  },
  methods: {
    viewProduct(productDetail) {
      console.log(productDetail);
      this.$store.dispatch('setViewProductAction',productDetail )
      this.$router.push('/details')
    },
  },
};
</script>
<style scoped>
.product_box {
  /* border: 1px solid gray; */
  font-family: Avenir-Roman;
  transition: 0.5s;
  font-size: 18px;
  position: relative;
  overflow: hidden;
}

.view-details {
  width: 80%;
  margin: auto;
  height: 40px;
  display: block;
  background: #c11d14;
  position: absolute;
  cursor: pointer;
  font-weight: bold;
  /* border-radius: 40px; */
  margin-left: 20px;
  bottom: 0;
  left: 0;
  opacity: 0;
  transform: translateY(-60px);
  transition: all 0.5s;
  color: white;
}
.product_box:hover .view-details {
  opacity: 1;
}

.sizes {
  display: none;
  transition: 0.5s;
}
.product_box:hover {
  /* border: 1px solid rgb(182, 181, 181); */
}
.product_box:hover .sizes {
  display: block;
}
.img_container {
  overflow: hidden;
}
.main-img {
  height: 400px;

  transition: transform 1s;
  border-radius: 20px;
}
.main-img:hover {
  transform: scale(1.1);

  box-shadow: 9px 9px 6px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 9px 9px 6px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 9px 9px 6px 0px rgba(0, 0, 0, 0.4);
}
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
</style>