import { defineStore } from "pinia";
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

export default defineStore("cartStore", {
    state: () => ({
        carts: [],
        loadingStatus: '',
    }),
    actions: {
        getCart(){
            axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`).then(res => {
                this.carts = res.data.data;
            }).catch((err) => {
                Toast.fire({
                    icon: "error",
                    title: err.response.data.message,
                  });
            });
        },
        addToCart(product_id, qty = 1, modal) {

            const data = {
               product_id,
               qty,
            };

            this.loadingStatus = product_id;

            axios.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data }).then((res) => {
                Toast.fire({
                    icon: "success",
                    title: res.data.message,
                  });
                this.loadingStatus = '';
                this.getCart();
                if(modal) {
                    modal.hide();
                }
            }).catch((err) => {
                Toast.fire({
                    icon: "error",
                    title: err.response.data.message,
                  });
            });
        },
        changeQty(cartId, product_id, e) {

            const data = {
                product_id,
                qty: Number(e.target.value),
            };

            axios.put(`${VITE_URL}/api/${VITE_PATH}/cart/${cartId}`, { data }).then((res) => {
                Toast.fire({
                    icon: "success",
                    title: res.data.message,
                  });
                this.getCart();
            }).catch((err) => {
                Toast.fire({
                    icon: "error",
                    title: err.response.data.message,
                  });
            });
        },
        removeCartAllItem() {
            Swal.fire({
                title: "確定要清空購物車?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "確定",
                cancelButtonText: "取消"
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${VITE_URL}/api/${VITE_PATH}/carts`).then((res) => {
                        Toast.fire({
                            icon: "success",
                            title: res.data.message,
                            });
                        this.getCart();
                    }).catch((err) => {
                        Toast.fire({
                            icon: "error",
                            title: err.response.data.message,
                          });
                    });
                };
              });
        },
        removeCartItem(product_id) {
            axios.delete(`${VITE_URL}/api/${VITE_PATH}/cart/${product_id}`).then((res) => {
                Toast.fire({
                    icon: "success",
                    title: res.data.message,
                  });
                this.getCart();
            }).catch((err) => {
                Toast.fire({
                    icon: "error",
                    title: err.response.data.message,
                  });
            });
        }
    },
})