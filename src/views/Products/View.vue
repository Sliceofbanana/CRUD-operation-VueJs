<template>
    <!-- Container for the products page -->
    <div class="container mt-5">
        <!-- Card for displaying products -->
        <div class="card">
            <!-- Card header with title and Add Product button -->
            <h4 class="card-header bg-transparent object-fit-contain">
                PRODUCTS
                <!-- Button to add a new product -->
                <RouterLink to="/products/create" class="btn btn-primary float-end mb-3"> 
                    Add a Product
                </RouterLink>
            </h4>
        </div>
        <!-- Card body for displaying product table -->
        <div class="card-body">
            <!-- Table to display products -->
            <table class="table table-bordered mb-3">
                <thead>
                    <!-- Table header row -->
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="this.products.length > 0">
                    <!-- Loop through products and display each row -->
                    <tr v-for="(products, index) in this.products" :key="index">
                        <!-- Display product details in each cell -->
                        <td>{{ products.id }}</td>
                        <td>{{ products.name }}</td>
                        <td>{{ products.quantity }}</td>
                        <td>{{ products.price }}</td>
                        <td>{{ products.description }}</td>
                        <td>
                            <!-- Button to edit product -->
                            <RouterLink :to="{path: '/products/' + products.id + '/edit'}" class="btn btn-success "> 
                                Edit
                            </RouterLink>
                            <!-- Button to delete product -->
                            <button type="button" @click="deleteproduct(products.id)" class="btn btn-danger ms-3">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <!-- Display loading message if no products available -->
                    <tr>
                        <td colspan="/">Loading...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// Import axios for making HTTP requests
import axios from 'axios'

export default {
    name: 'products',
    data(){
        return{
            // Initialize products array
            products: []
        }
    },
    // Lifecycle method to fetch products when component mounts
    mounted(){
        this.getProducts();
    },
    methods: {
        // Method to fetch products from API
        getProducts(){
            axios.get('http://127.0.0.1:8000/api/products').then(res =>{
                console.log(res);
                // Set products data
                this.products = res.data.products
                console.log(this.products)
            });
        },

        // Method to delete a product
        deleteproduct(productid){
            // Confirm before deleting product
            if(confirm('Are you sure, you want to delete this data?')){
                // Make delete request to API
                axios.delete(`http://127.0.0.1:8000/api/products/${productid}/destroy`)
                    .then(res =>{
                        // Show success message and refresh products
                        alert(res.data.message);
                        this.getProducts();
                })
                .catch(function (error) {
                    // Handle errors
                    console.log(error);
                    if(error.response) {
                        if(error.response && error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    } else if(error.request) {
                        alert('Failed to delete product. Please try again later.');
                    }
                });
            }
        },
    },
}
</script>
