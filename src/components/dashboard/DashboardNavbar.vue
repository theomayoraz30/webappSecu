<script lang="ts" setup>
import router from '@/router';
import { API_REQUEST, API_ROUTES } from '@/scripts/utils/api';
import { WEB_ROUTES_NAMES } from '@/scripts/utils/routes';

function logout() {
    API_REQUEST.post(API_ROUTES.AUTH.LOGOUT.route)
        .then(() => {
            // Redirection vers la page 'login'
            router.push({ name: WEB_ROUTES_NAMES.LOGIN });
        });
}
</script>

<template>
  <div class="d-flex flex-column align-items-start px-3 pt-2 text-white min-vh-100 sidebar">
    <!-- Profil -->
    <div class="profile-container d-flex align-items-center pb-4 mb-md-0 me-md-auto w-100 mt-3">
      <img class="profile-img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTYWtcpPr3jLqRuZJDXzgBDqRCPPRLDNGV-w&s"
        alt="hugenerd">
      <span class="fw-bold text-white mx-2 d-none d-sm-inline">Théo</span>
    </div>

    <!-- Menu -->
    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center w-100 text-center" id="menu">
      <li class="nav-item w-100">
        <router-link :to="{ name: WEB_ROUTES_NAMES.DASHBOARD.HOME }" class="nav-link d-flex align-items-center px-0 text-white">
          <i class='bx bx-home'></i>
          <span class="mx-2 d-none d-sm-inline">Home</span>
        </router-link>
      </li>
      <li class="nav-item w-100">
        <router-link :to="{ name: WEB_ROUTES_NAMES.DASHBOARD.PROFILE }" class="nav-link d-flex align-items-center px-0 text-white">
          <i class='bx bx-cog'></i>
          <span class="mx-2 d-none d-sm-inline">Profile</span>
        </router-link>
      </li>
      <li class="nav-item w-100">
        <router-link :to="{ name: WEB_ROUTES_NAMES.DASHBOARD.USERS }" class="nav-link d-flex align-items-center px-0 text-white">
          <i class='bx bx-list-ul'></i>
          <span class="mx-2 d-none d-sm-inline">Users</span>
        </router-link>
      </li>
    </ul>

    <hr class="w-100 mt-auto">

    <!-- Déconnexion -->
    <div class="pb-4 w-100">
      <a href="#" @click="logout" class="d-flex align-items-center text-white text-decoration-none px-3">
        <i class='bx bx-log-out px-2'></i>
        <span class="d-none d-sm-inline">Sign out</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Sidebar background */
.sidebar {
  background-color: #242527;
}

/* Image Profil */
.profile-img {
  width: 35px;
  height: 35px;
  border-radius: 8px;
}

.nav-link span {
  font-size: 15px;
}

.nav-link i {
  font-size: 25px;
}


/* Centrage en mode mobile */
@media (max-width: 576px) {

  /* Centrer la photo de profil et le texte */
  .profile-container {
    flex-direction: column;
    align-items: center !important;
    text-align: center;
  }

  .profile-img {
    margin-bottom: 5px;
  }

  /* Centrer les icônes */
  .nav-item a {
    justify-content: center;
  }
}
</style>
