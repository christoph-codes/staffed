<template>
  <div id="adminHome">
    <AdminHeader/>
    <div class="columns">
      <div class="column is-one-fifth">
        <AdminSidenav/>
      </div>
      <div class="column is-four-fifths">
        <div class="dashboard">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <AdminFooter/>
  </div>
</template>

<script>
import AdminHeader from "@/components/admin/layouts/AdminHeader";
import AdminFooter from "@/components/admin/layouts/AdminFooter";
import AdminSidenav from "@/components/admin/layouts/AdminSidenav";

export default {
  name: "admin",
  components: {
    AdminHeader,
    AdminFooter,
    AdminSidenav
  },
  data() {
    return {
    };
  }
};
</script>


