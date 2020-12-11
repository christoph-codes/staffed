<template>
  <div class="admin-edit-people">
    <h1>Edit {{ this.$route.params.members_slug }}</h1>
  </div>
</template>

<script>
export default {
  name: "EditMembers",
  data() {
    return {};
  },
  methods: {
    editMember() {
      db.collection("members")
        .get()
        .then(() => {
          console.log("edit member");
        });
    }
  }
};
</script>

<style>
</style>

