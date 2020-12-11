<template>
    <div class="main">
        <Header/>
        <router-view></router-view>
        <Footer/>
    </div>
</template>


<script>
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

export default {
    name: 'Main',
    data() {
        return {};
    },
    components: {
        Header, Footer
    }
}
</script>
