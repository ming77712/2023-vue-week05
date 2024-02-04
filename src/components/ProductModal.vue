<script>
import productsStore from "../stores/productsStore.js";
import cartStore from "../stores/cartStore.js";
import { mapState, mapActions } from "pinia";
import { Modal } from 'bootstrap';

export default {
    data() {
        return {
            modal: null,
            qty: 1,
        };
    },
    methods: {
        ...mapActions(cartStore, ["addToCart"]),
        addQty() {
            if (this.qty < 20)
                this.qty++;
        },
        subQty() {
            if (this.qty > 1)
                this.qty--;
        },
    },
    watch: {
        currentProduct() {
            this.qty = 1;
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal, {
            keyboard: false,
            backdrop: "static",
        });
        this.$emit("productInstance", this.modal);
    },
    computed: {
        ...mapState(productsStore, ["currentProduct"]),
        ...mapState(cartStore, ["carts"]),
    },
}
</script>

<template>
    <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ModalLabel"
        aria-hidden="true"
        ref="modal"
    >
        <div
            class="modal-dialog modal-xl"
            role="document"
        >
            <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5
                        class="modal-title"
                        id="ModalLabel"
                    >
                        <span>{{ this.currentProduct.title }}</span>
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <img
                                class="img-fluid"
                                :src="this.currentProduct.imageUrl"
                                alt=""
                            >
                        </div>
                        <div class="col-sm-6">
                            <span class="badge bg-primary rounded-pill">{{ this.currentProduct.category }}</span>
                            <p>商品描述：{{ this.currentProduct.content }}</p>
                            <p>商品內容：{{ this.currentProduct.description }}</p>
                            <del class="h6">原價 {{ this.currentProduct.origin_price }} 元</del>
                            <div class="h5">現在只要 {{ this.currentProduct.price }} 元</div>
                            <div>
                                <div class="input-group w-50 my-4">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        @click.prevent="subQty()"
                                        :disabled="qty === 1"
                                    >-</button>
                                    <input
                                        type="number"
                                        class="form-control"
                                        min="1"
                                        :value="qty"
                                        readonly
                                    >
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        @click.prevent="addQty()"
                                        :disabled="qty === 20"
                                    >+</button>
                                </div>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    @click.prevent="addToCart(this.currentProduct.id, this.qty, this.modal)"
                                >加入購物車</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>