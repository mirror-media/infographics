<script>
export default {
  methods: {
    gaClickHandler(eventLabel) {
      // console.log(eventLabel)
      this.$ga.event({
        eventCategory: 'project',
        eventAction: 'click',
        eventLabel,
      })
    },
    gaScrollHandler(eventLabel) {
      // console.log(eventLabel)
      this.$ga.event({
        eventCategory: 'project',
        eventAction: 'scroll',
        eventLabel,
      })
    },
  },
}
</script>
