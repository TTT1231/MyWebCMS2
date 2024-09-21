import sleep from '@/utils/sleep';
import { ref } from 'vue';

const isStart = ref(false);
const percentage = ref(0);
const addPercentage = async () => {
   for (let i = 1; i <= 4; i++) {
      await sleep(50);
      percentage.value += 25;
   }
   if (percentage.value === 100) {
      await sleep(700);
      isStart.value = false;
      percentage.value = 0;
   }
};
const start = () => {
   if (isStart.value) {
      percentage.value = 0;
      return;
   } else {
      isStart.value = true;
      addPercentage();
   }
};
export function useProgress() {
   return {
      isStart,
      percentage,
      start
   };
}
