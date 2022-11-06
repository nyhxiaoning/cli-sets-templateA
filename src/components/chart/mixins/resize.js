export default {
  data() {
    return {
      $_sidebarElm: null,
      $_resizeHandler: null
    }
  },
  mounted() {
    this.$_resizeHandler = () => {
      this.chart && this.chart.resize();
    };
    this.$_initResizeEvent();
  },
  beforeDestroy() {
    this.$_destroyResizeEvent();
  },
  activated() {
    this.$_initResizeEvent()
  },
  deactivated() {
    console.info('deactivated')
    this.$_destroyResizeEvent()
  },
  methods: {
    $_initResizeEvent() {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
      window.removeEventListener('resize', this.$_resizeHandler)
    }
  },
  watch: {
    chart(e) {
      e.resize();
    }
  }
}
