<template>
    <div class="homepage">
        <div class="hero" id="home-hero">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-vcentered">
                        <div class="column is-one-half">
                            <div class="hero-text">
                                <h2>Home Hero</h2>
                                <p>Lorem ipaisdo fijpoidbgpoiadh pfphadih pasl dskjo g.</p>
                                <router-link class="btn" to="/pricing">Get Started</router-link>
                            </div>
                        </div>
                        <div class="column is-on-half">
                            <img src="@/assets/homepage/home-hero.png" alt="Staffed iOS and Android Apps">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-content">
            <div class="container">
                <h1>Staffed Home</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Homepage',
    data() {
        return {}
    }
}
</script>
