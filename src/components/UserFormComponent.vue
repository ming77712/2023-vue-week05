<script>
import cartStore from "../stores/cartStore";
import { mapState, mapActions } from "pinia";
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

const sweetMessage = {
    icon: "",
    title: "",
    showConfirmButton: false,
    timer: 1500,
};

export default {
    data() {
        return {
            form: {
                user: {
                    email: '',
                    name: '',
                    tel: '',
                    address: '',
                },
                message: '',
            }
        };
    },
    methods: {
        ...mapActions(cartStore, ["getCart"]),
        createOrder() {
            if (this.carts.carts.length === 0) {
                this.setSweetMessageError("購物車是空的 無法送出訂單");
                Swal.fire(sweetMessage);
            } else {
                const data = this.form;
                axios.post(`${VITE_URL}/api/${VITE_PATH}/order`, { data }).then((res) => {
                    this.setSweetMessageSuccess(res.data.message);
                    this.$refs.form.resetForm();
                    this.getCart();
                    Swal.fire(sweetMessage);
                }).catch((err) => {
                    this.setSweetMessageError(err.response.data.message);
                    Swal.fire(sweetMessage);
                });
            }
        },
        setSweetMessageSuccess(res) {
            sweetMessage.icon = "success";
            sweetMessage.title = res;
            sweetMessage.timer = 1500;
        },
        setSweetMessageError(err) {
            sweetMessage.icon = "error";
            sweetMessage.title = err;
            sweetMessage.timer = 2500;
        },
    },
    computed: {
        ...mapState(cartStore, ["carts"]),
    },
}
</script>

<template>
    <v-form
        ref="form"
        class="col-md-6"
        @submit="createOrder"
        v-slot="{ errors }"
    >
        <div class="mb-3">
            <label
                for="email"
                class="form-label"
            >Email</label>
            <v-field
                id="email"
                name="Email"
                type="email"
                class="form-control"
                rules="email|required"
                v-model="form.user.email"
                :class="{ 'is-invalid': errors['Email'] }"
                placeholder="請輸入 Email"
            ></v-field>
            <error-message
                name="Email"
                class="invalid-feedback"
            ></error-message>
        </div>

        <div class="mb-3">
            <label
                for="name"
                class="form-label"
            >收件人姓名</label>
            <v-field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                rules="required"
                v-model="form.user.name"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
            ></v-field>
            <error-message
                name="姓名"
                class="invalid-feedback"
            ></error-message>
        </div>

        <div class="mb-3">
            <label
                for="tel"
                class="form-label"
            >收件人電話</label>
            <v-field
                id="tel"
                name="電話"
                type="tel"
                class="form-control"
                rules="required|min:8|max:10"
                v-model="form.user.tel"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話"
            ></v-field>
            <error-message
                name="電話"
                class="invalid-feedback"
            ></error-message>
        </div>

        <div class="mb-3">
            <label
                for="address"
                class="form-label"
            >收件人地址</label>
            <v-field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                rules="required"
                v-model="form.user.address"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
            ></v-field>
            <error-message
                name="地址"
                class="invalid-feedback"
            ></error-message>
        </div>

        <div class="mb-3">
            <label
                for="message"
                class="form-label"
            >留言</label>
            <textarea
                name=""
                id="message"
                class="form-control"
                v-model="form.message"
                cols="30"
                rows="10"
            ></textarea>
        </div>
        <div class="text-end">
            <button
                type="submit"
                class="btn btn-danger"
            >送出訂單</button>
        </div>
    </v-form>
</template>