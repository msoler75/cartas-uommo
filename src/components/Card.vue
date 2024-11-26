<template>
    <div class="card">
        <slot />
    </div>
</template>

<style scoped>
.card {
    width: var(--w);
    height: var(--h);
    @apply rounded shadow-2xl flex justify-center items-center bg-blue-500;
    transform: translateX(var(--x)) translateY(var(--y)) rotate(var(--r)); 
}
</style>