<script lang="ts">
let ww = 0;
let wh = 0;
export default {
  data() {
    return {
      initPostion: {} as DOMRect,
    };
  },
  methods: {
    handleTouchStart(e: TouchEvent) {
      const el = e.target as HTMLElement;
      const { left, top, width, height } = el.getBoundingClientRect();
      const { clientX: sx, clientY: sy } = e.touches[0];
      el.style.transitionDuration = '0ms';

      document.ontouchmove = (e) => {
        e.preventDefault();
        const { clientX: x, clientY: y } = e.touches[0];

        const leftMax = Math.min(left + x - sx, ww - width);
        const leftMin = Math.max(leftMax, 0);

        const topMax = Math.min(top + y - sy, wh - height);
        const topMin = Math.max(topMax, 0);

        el.style.left = `${leftMin}px`;
        el.style.top = `${topMin}px`;
      };
      document.ontouchend = document.ontouchcancel = (e) => {
        e.preventDefault();
        document.ontouchmove = document.ontouchend = document.ontouchcancel = null;
        el.style.transitionDuration = '300ms';
        el.style.left = this.initPostion.left + 'px';
      };
    },
  },
  render() {
    return this.$slots.default;
  },
  created() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    this.handleTouchStart = this.handleTouchStart.bind(this);
  },
  mounted() {
    const el = this.$el as HTMLElement;
    this.initPostion = el.getBoundingClientRect();
    const { left, top, width, height } = this.initPostion;
    Object.assign(el.style, {
      touchAction: 'none',
      bottom: 'auto',
      right: 'auto',
      left: left + 'px',
      top: top + 'px',
    });

    this.$el.addEventListener('touchstart', this.handleTouchStart, false);
  },
};
</script>
