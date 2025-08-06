<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import CommonButton from "../ui/button/CommonButton.vue";
import Drawer from "../ui/drawer/Drawer.vue";
import DrawerTrigger from "../ui/drawer/DrawerTrigger.vue";
import DrawerContent from "../ui/drawer/DrawerContent.vue";
import DrawerHeader from "../ui/drawer/DrawerHeader.vue";
import DrawerTitle from "../ui/drawer/DrawerTitle.vue";
import { computed } from "vue";

const { label, options } = defineProps<{
  label: string;
  options: string[];
}>();

const selected = defineModel<string[]>("selected", { default: [] });

function toggleSelection(option: string) {
  const index = selected.value.indexOf(option);
  if (index > -1) {
    selected.value.splice(index, 1);
  } else {
    selected.value.push(option);
  }
}

function isSelected(item: string) {
  return selected.value.includes(item);
}

const hasSelection = computed(() => options.some((option) => selected.value.includes(option)));
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <CommonButton
        class="w-fit"
        variant="outline"
        :class="hasSelection ? 'text-primary border-primary font-bold' : ''"
        >{{ label }} <ChevronDown
      /></CommonButton>
    </DrawerTrigger>
    <DrawerContent class="bg-white">
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>{{ label }}</DrawerTitle>
        </DrawerHeader>
        <div class="p-4">
          <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            <label
              v-for="option in options"
              :key="option"
              class="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                :id="option"
                :checked="isSelected(option)"
                @change="toggleSelection(option)"
                class="accent-primary"
              />
              {{ option }}
            </label>
          </div>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>
