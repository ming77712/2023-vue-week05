<script>
import productsStore from "../stores/productsStore.js";
import cartStore from "../stores/cartStore.js";
import { mapState, mapActions } from "pinia";

export default {
    props: ["modal"],
    methods: {
        ...mapActions(productsStore, ["getAllProduct", "getCurrentProduct"]),
        ...mapActions(cartStore, ["addToCart"]),
        openModal(product) {
            this.getCurrentProduct(product);
            this.modal.show();
        },
    },
    mounted() {
        this.getAllProduct();
    },
    computed: {
        ...mapState(productsStore, ["products", "currentProduct"]),
        ...mapState(cartStore, ["carts", "loadingStatus"]),
    },
};
</script>

<template>
    <table class="table align-middle">
        <thead>
            <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
            </tr>
        </thead>
        <tbody
            v-for="(product, index) in products"
            :key="index"
        >
            <tr>
                <td style="width: 200px">
                    <img
                        style="height: 200px; background-size: cover; background-position: center"
                        :src="product.imageUrl"
                    />
                </td>
                <td>
                    {{ product.title }}
                </td>
                <td>
                    <del class="h6">原價 {{ product.origin_price }} 元</del>
                    <div class="h5">現在只要 {{ product.price }} 元</div>
                </td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button
                            type="button"
                            class="btn btn-outline-secondary"
                            @click.prevent="openModal(product)"
                        >
                            查看更多
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-danger"
                            :disabled="product.id === this.loadingStatus"
                            @click.prevent="addToCart(product.id)"
                        >
                            <span
                                class="spinner-border spinner-border-sm"
                                aria-hidden="true"
                                v-if="product.id === this.loadingStatus"
                            ></span>
                            加到購物車
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>