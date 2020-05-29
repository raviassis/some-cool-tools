<template>
    <div>
        <div class="presentation">
            <h1 class="h1">Wellcome to Some Cool Tools</h1>
        </div>
        <div class="mt-5 mb-5">
            <h2 class="h2 border-bottom">Tools</h2>
            <nav class="nav flex-column">
                <router-link class="nav-link" to="/json-to-csv">Json To Csv</router-link>
                <router-link class="nav-link" to="/investiment-simulation">Investiment Simulation</router-link>
            </nav>
        </div>
    </div>
</template>

<style scoped>
    .presentation h1{
        text-align: center;
    }
    .nav {
        font-size: 1.5rem;
    }
    
</style>

