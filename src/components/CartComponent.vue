<script>
import cartStore from "../stores/cartStore";
import { mapState, mapActions } from "pinia";

export default {
    methods: {
        ...mapActions(cartStore, ["getCart", "changeQty", "removeCartAllItem", "removeCartItem"]),
    },
    mounted() {
        this.getCart();
    },
    computed: {
        ...mapState(cartStore, ["carts"]),
    },
}
</script>

<template>
    <div class="text-end">
        <button
            class="btn btn-outline-danger"
            type="button"
            @click="removeCartAllItem()"
        >清空購物車</button>
    </div>
    <table class="table align-middle">
        <thead>
            <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th>單價</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="carts.carts">
                <tr
                    v-for="(product, index) in carts.carts"
                    :key="index"
                >
                    <td>
                        <button
                            type="button"
                            class="btn btn-outline-danger btn-sm"
                            @click="removeCartItem(product.id)"
                        >
                            <i class="fas fa-spinner fa-pulse"></i>
                            x
                        </button>
                    </td>
                    <td>
                        {{ product.product.title }}
                        <!-- <div class="text-success">
                            已套用優惠券
                        </div> -->
                    </td>
                    <td>
                        <div class="input-group input-group-sm">
                            <div class="input-group mb-3">
                                <!-- <input
                                    min="1"
                                    type="number"
                                    class="form-control"
                                    :value="product.qty"
                                > -->
                                <select
                                    class="form-select"
                                    name="qty"
                                    id="qty"
                                    :value="product.qty"
                                    @change="(e) => changeQty(product.id, product.product_id, e)"
                                >
                                    <option
                                        :value="i"
                                        v-for="i in 20"
                                        :key="i"
                                    >{{ i }}</option>
                                </select>
                                <span
                                    class="input-group-text"
                                    id="basic-addon2"
                                >{{ product.product.unit }}</span>
                            </div>
                        </div>
                    </td>
                    <td class="text-end">
                        <!-- <small class="text-success">折扣價：</small> -->
                        {{ product.total }}
                    </td>
                </tr>
            </template>
        </tbody>
        <tfoot>
            <tr>
                <td
                    colspan="3"
                    class="text-end"
                >總計</td>
                <td class="text-end">{{ carts.final_total }}</td>
            </tr>
            <!-- <tr>
                <td
                    colspan="3"
                    class="text-end text-success"
                >折扣價</td>
                <td class="text-end text-success">{{ }}</td>
            </tr> -->
        </tfoot>
    </table>
</template>