import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/pages/Home";
import Homepage from '@/components/pages/Homepage'

// Front Facing Homepage
import Help from '@/components/pages/Help'
import FAQ from '@/components/pages/FAQ'
import Pricing from '@/components/pages/Pricing'
import Features from '@/components/pages/Features'

// Auth
import AdminSignup from "@/components/admin/Auth/AdminSignup";
import AdminLogin from "@/components/admin/Auth/AdminLogin";
import Signup from "@/components/admin/Auth/Signup"
import CompanySignup from "@/components/admin/Auth/CompanySignup"

// Dashboard
import Admin from "@/components/admin/Admin.vue";
import NotFound from "@/components/NotFound.vue";

// Members
import Members from "@/components/admin/members/Members.vue";
import AddMembers from "@/components/admin/members/AddMembers.vue";
import EditMembers from "@/components/admin/members/EditMembers.vue";

// Gigs
import AdminGigs from "@/components/admin/Gigs/AdminGigs.vue";

// Groups
import AdminGroups from "@/components/admin/Groups/AdminGroups.vue";
import AdminAddGroup from "@/components/admin/Groups/AdminAddGroup.vue";
import AdminEditGroup from "@/components/admin/Groups/AdminEditGroup.vue";

// Settings
import AdminSettings from "@/components/admin/Settings/AdminSettings.vue";
import AdminGeneralSettings from "@/components/admin/Settings/AdminGeneralSettings.vue";
import AdminTemplateSettings from "@/components/admin/Settings/AdminTemplateSettings.vue";

// Libraries
import firebase from 'firebase'

Vue.use(Router);

const router = new Router({
  routes: [{
      path: "/",
      redirects: "Homepage",
      component: Home,
      children: [{
          path: "/",
          name: "Homepage",
          component: Homepage
        },
        {
          path: "adminsignup",
          name: "AdminSignup",
          component: AdminSignup
        },
        {
          path: "login",
          name: "AdminLogin",
          component: AdminLogin
        },
        {
          path: "help",
          name: "Help",
          component: Help
        },
        {
          path: "faq",
          name: "FAQ",
          component: FAQ
        },
        {
          path: "pricing",
          name: "Pricing",
          component: Pricing
        },
        {
          path: "features",
          name: "Features",
          component: Features
        }
      ]
    },

    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/companysignup",
      name: "CompanySignup",
      component: CompanySignup
    },
    {
      path: "/admin/",
      name: "Admin",
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "gigs",
          name: "AdminGigs",
          component: AdminGigs
        },
        {
          path: "members",
          name: "Members",
          component: Members
        },
        {
          path: "members/add",
          name: "AddMembers",
          component: AddMembers
        },
        {
          path: "members/edit",
          name: "EditMembers",
          component: EditMembers
        },
        {
          path: "groups",
          name: "AdminGroups",
          component: AdminGroups
        },
        {
          path: "groups/add",
          name: "AdminAddGroup",
          component: AdminAddGroup
        },
        {
          path: "groups/edit",
          name: "AdminEditGroup",
          component: AdminEditGroup
        },
        {
          path: "/admin/settings/",
          name: "AdminSettings",
          component: AdminSettings,
          children: [{
              path: "general",
              name: "AdminGeneralSettings",
              component: AdminGeneralSettings
            },
            {
              path: "templates",
              name: "AdminTemplateSettings",
              component: AdminTemplateSettings
            }
          ]
        },
        {
          path: "/admin/*",
          name: "NotFound",
          component: NotFound
        }
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // user signed in, proceed to route
      next()
    } else {
      // no user signed in redirect to login
      next({
        name: 'AdminLogin'
      })
    }
  } else {
    next()
  }
})
export default router;
