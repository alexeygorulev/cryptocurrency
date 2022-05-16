<template>
  <footer class="footer">
    <div class="container">
        <ul class="navbar-list icons">
          <p class="" v-for="icon in icons" :key="icon">
            <a :href="icon.url" class="navbar-item icons">
              <img class="img" :src="icon.path" alt="ops">
            </a>
          </p>
        </ul>
    </div>

  </footer>
</template>

<script>
import {icons} from '@/_config.js';
export default {
  data () {
    return {
      icons: icons,
    }
  }
}
</script>

<style lang="scss" >
.img {
  width: 20px
}
.navbar-item {
  &.icons {
    margin: 30px
  }
}

</style>
