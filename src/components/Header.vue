<template>
  <header class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="navbar-logo">logo</router-link>
        <ul class="navbar-list">
          <li class="navbar-item" v-for="link in links" :key="link.alias">
            <router-link :to="link.url" class="navbar-item">{{link.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>

  </header>
</template>

<script>
import {links} from '@/_config.js';
export default {
  data () {
    return {
      links: links
    }
  }
}
</script>
