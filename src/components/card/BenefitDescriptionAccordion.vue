<script setup lang="ts">
import Accordion from "../ui/accordion/Accordion.vue";
import AccordionContent from "../ui/accordion/AccordionContent.vue";
import AccordionItem from "../ui/accordion/AccordionItem.vue";
import AccordionTrigger from "../ui/accordion/AccordionTrigger.vue";

const { description } = defineProps<{
  description: string;
}>();
</script>

<template>
  <Accordion type="single" collapsible class="w-full text-sm text-stone-500">
    <AccordionItem value="desc">
      <AccordionTrigger class="underline px-0 py-2 hover:cursor-pointer"> 자세히 </AccordionTrigger>
      <AccordionContent>
        <div class="prose prose-stone prose-sm" v-html="description"></div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
