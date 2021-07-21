import {
  defineComponent,
  h,
  Ref,
  ref,
  toRefs,
  PropType,
  watch,
  onMounted,
  onUnmounted,
} from "vue";
import Highcharts, { Chart, Options } from "highcharts";

const vueHighcharts = defineComponent({
  name: "VueHighcharts",
  props: {
    type: {
      type: String as PropType<keyof typeof Highcharts>,
      default: "chart",
    },
    options: {
      type: Object as PropType<Options>,
      required: true,
    },
    // 更新时是否重新绘制
    redrawOnUpdate: {
      type: Boolean,
      default: true,
    },
    oneToOneUpdate: {
      type: Boolean,
      default: true,
    },
    animateOnUpdate: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    // html引用
    const chartRef = ref(null);
    const chart: Ref<Chart | null> = ref(null);
    const { options } = toRefs(props);
    if (options.value) {
      watch(
        options,
        (newValue) => {
          if (chart.value !== null) {
            // highcharts方法
            (chart as unknown as Ref<Chart>).value.update(
              newValue,
              props.redrawOnUpdate,
              props.oneToOneUpdate,
              props.animateOnUpdate
            );
            emit("update");
          }
        },
        { deep: true }
      );
      onMounted(() => {
        chart.value = Highcharts[props.type](
          chartRef.value,
          options.value,
          () => {
            emit("rendered");
          }
        );
      });
      onUnmounted(() => {
        if (chart?.value) {
          (chart as unknown as Ref<Chart>).value.destroy;
        }
        emit("destroyed");
      });
    } else {
      console.error("请传递渲染函数组件必须的参数");
    }
    return {
      chartRef,
      chart,
    };
  },
  render() {
    return h("div", {
      class: "vue-highcharts",
      ref: "chartRef",
    });
  },
});

export default vueHighcharts;
