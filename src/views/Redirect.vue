<template>
  <div class="redirect">
    {{data}}
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'redirect',
  data(){
    return {
      data:''
    }
  },
  mounted(){
    this.oauthRedirect()
  },
  methods:{
    oauthRedirect(){
      this.$axios.get("http://localhost:3000/redirect"+location.search).then(response => {
        console.log(response.data.access_token)
        this.$store.commit('SET_TOKEN', response.data.access_token)
        this.data = response.data;
        router.push('/')
    });
    }
  },
}
</script>
