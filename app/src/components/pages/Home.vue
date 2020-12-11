<template>
    <div class="main">
        <Header/>
        <div class="page-content">
            <router-view></router-view>
        </div>
        <Footer/>
    </div>
</template>


<script>
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

export default {
    name: 'Home',
    data() {
        return {};
    },
    components: {
        Header, Footer
    }
}
</script>

