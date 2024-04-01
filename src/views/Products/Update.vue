<template>
    <!-- Container for editing a product -->
    <div class="container mt-5">
        <!-- Card for displaying edit form -->
        <div class="card">
            <!-- Card header -->
            <div class="card-header">
                <!-- Title for edit page -->
                <h4>Edit a Product</h4>
            </div>
            <!-- Card body for edit form -->
            <div class="card-body">
                <!-- Display validation errors if any -->
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <!-- Form fields for editing product details -->
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="model.products.name" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Quantity</label>
                    <input type="number" v-model="model.products.quantity" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Price</label>
                    <input type="number" v-model="model.products.price" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Description</label>
                    <input type="text" v-model="model.products.description" class="form-control" />
                </div>
                <div class="mb-3">
                    <!-- Button to update product -->
                    <button type="button" @click="updateStudent" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Import axios for making HTTP requests
import axios from 'axios'

export default {
    name: 'ProductsEdit',
    data(){
        return{
            // Initialize product id, error list, and model for form data
            productid: '',
            errorList: '',
            model: {
                products: {
                    name: '',
                    quantity: '',
                    price: '',
                    description: ''
                }
            }
        }
    },
    mounted(){
        // Fetch product data when component mounts
        this.productid = this.$route.params.id;
        this.getproductData(this.$route.params.id);
    },
    methods:{
        // Method to fetch product data for editing
        getproductData(productid){
            axios.get(`http://127.0.0.1:8000/api/products/${productid}/edit`)
            .then(res =>{
                console.log(res.data);

                if (res.data) {
                    // Update model with product data
                    this.model.products = res.data;
                }else {
                    // Display error if products data is missing
                    console.log("Products data is missing from the response.");
                }
            })
            .catch(function (error) {
                // Handle errors
                if (error.response && error.response.status == 404) {
                    alert("No product found.");
                } else {
                    console.error("Error fetching product data:", error);
                    console.log("Error fetching product data. Please try again later.");
                }
            });
        },

        // Method to update product
        updateStudent(){
            var mythis = this;
            axios.put(`http://127.0.0.1:8000/api/products/${this.productid}/update`, this.model.products)
                .then(res => {
                    console.log(res.data)
                    // Show success message and redirect to products page
                    alert(res.data.message);

                    this.errorList = '';
                    this.$router.push({ name: 'products' });
                })
                .catch(function (error) {
                    // Handle errors
                    console.log(error);
                    if(error.response) {
                        if(error.response.status == 422){
                            mythis.errorList = [error.response.data.message];
                        }
                        if(error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    } else if(error.request) {
                        console.log(error.request);
                    } else{
                        console.log('Error', error.message);
                    }
                });
        }
    },
}
</script>
