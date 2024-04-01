<template>
    <!-- Container for adding a product -->
    <div class="container mt-5">
        <!-- Card for displaying add form -->
        <div class="card">
            <!-- Card header -->
            <div class="card-header">
                <!-- Title for add page -->
                <h4>Add a Product</h4>
            </div>
            <!-- Card body for add form -->
            <div class="card-body">
                <!-- Display validation errors if any -->
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <!-- Form fields for adding product details -->
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
                    <!-- Button to save product -->
                    <button type="button" @click="saveStudent" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Import axios for making HTTP requests
import axios from 'axios'
export default {
    name: 'ProductsCreate',
    data(){
        return{
            // Initialize error list and model for form data
            errorList: [],
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
    methods: {
        // Method to save product
        saveStudent(){
            var mythis = this;
            axios.post('http://127.0.0.1:8000/api/products', this.model.products)
                .then(res => {
                    console.log("Response data:", res.data);
                    // Show success message and clear form
                    alert("Product successfully added");

                    this.model.products = {
                        name: '',
                        quantity: '',
                        price: '',
                        description: ''
                    }
                    this.errorList = [];
                    // Redirect to products page
                    this.$router.push({ name: 'products' });
                })
                .catch(function(error) {
                    // Handle errors
                    console.error("Error:", error);
                    if (error.response) {
                        if (error.response.status == 422) {
                            mythis.errorList = error.response.data.message;
                        }
                    } else if (error.request) {
                        console.log("Request error:", error.request);
                    } else {
                        console.log('Error message:', error.message);
                    }
                });
        }
    },
}
</script>