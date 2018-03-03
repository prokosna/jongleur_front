import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $t: any
  }
  interface VueConstructor {
    $log: any
  }
}
