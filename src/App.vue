<script>
import ProductComponent from "./components/ProductComponent.vue";
import CartComponent from "./components/CartComponent.vue";
import UserFormComponent from "./components/UserFormComponent.vue";
import ProductModal from "./components/ProductModal.vue";

export default {
  data() {
    return {
      modal: null,
    }
  },
  methods: {
    getProductModal(productModel) {
      this.modal = productModel;
    }
  },
  components: {
    ProductComponent,
    CartComponent,
    UserFormComponent,
    ProductModal,
  },
};
</script>

<template>
  <div class="container">
    <div class="mt-4">
      <ProductComponent :modal="modal"></ProductComponent>
      <CartComponent></CartComponent>
    </div>
    <div class="my-5 row justify-content-center">
      <UserFormComponent></UserFormComponent>
    </div>
  </div>
  <ProductModal @product-instance="getProductModal"></ProductModal>
</template>

<style lang="scss">
@import "./assets/all.scss";
</style>
